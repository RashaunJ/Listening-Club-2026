import { readFile, writeFile } from 'node:fs/promises';
import { basename } from 'node:path';

// Run from any directory; paths are resolved relative to this script.
// node scripts/scrape-apple-album.mjs <album-url> <cover.jpg> <review.md>
const [albumUrl, filename, review] = process.argv.slice(2);
const source = new URL(albumUrl);
if (source.protocol !== 'https:' || source.hostname !== 'music.apple.com' || !source.pathname.includes('/album/')) {
  throw new Error('Provide an HTTPS Apple Music album URL.');
}
if (!filename || basename(filename) !== filename || !/^[a-z0-9-]+\.jpg$/.test(filename)
  || !review || basename(review) !== review || !review.endsWith('.md')) {
  throw new Error('Usage: node scripts/scrape-apple-album.mjs <album-url> <cover.jpg> <review.md>');
}

async function request(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
  return response;
}

const html = await (await request(source)).text();
const documents = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  .flatMap((match) => {
    const data = JSON.parse(match[1]);
    return data['@graph'] ?? (Array.isArray(data) ? data : [data]);
  });
const album = documents.find((document) => document['@type'] === 'MusicAlbum');
if (!album?.name || !album.image || !album.byArtist?.length || !Array.isArray(album.tracks)) {
  throw new Error('Apple Music album metadata is missing; inspect the page before updating the scraper.');
}

// Apple social images are rectangular; request the square, uncropped album art.
const image = new URL(album.image);
if (image.protocol !== 'https:' || !image.hostname.endsWith('.mzstatic.com')) {
  throw new Error('Unexpected artwork host.');
}
image.pathname = image.pathname.replace(/\/[^/]+$/, '/1000x1000bb.jpg');
const response = await request(image);
const bytes = Buffer.from(await response.arrayBuffer());
if (!response.headers.get('content-type')?.includes('image/jpeg') || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
  throw new Error('Artwork response is not a JPEG.');
}

const directory = new URL('../public/images/albums/', import.meta.url);
const sourcesUrl = new URL('sources.json', directory);
const sources = JSON.parse(await readFile(sourcesUrl, 'utf8'));
const artist = album.byArtist.map((entry) => entry.name).join(' & ');
const entry = {
  review,
  artist,
  title: album.name,
  matched_artist: artist,
  matched_title: album.name,
  source: source.href,
  image: image.href,
  filename,
  width: 1000,
  height: 1000,
  bytes: bytes.length,
};
const index = sources.albums.findIndex((entry) => entry.review === review);
if (index === -1) sources.albums.push(entry);
else sources.albums[index] = entry;
await writeFile(new URL(filename, directory), bytes);
await writeFile(sourcesUrl, `${JSON.stringify(sources, null, 2)}\n`);
console.log(JSON.stringify({
  artist,
  title: album.name,
  genres: album.genre.filter((genre) => genre !== 'Music'),
  cover: filename,
  tracks: album.tracks.map((track) => ({ title: track.name, url: track.url })),
}, null, 2));
