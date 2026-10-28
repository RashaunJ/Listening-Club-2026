// BASE_URL may omit the trailing slash depending on Astro's configuration.
export const base = `${import.meta.env.BASE_URL.replace(/\/+$/, "")}/`;
