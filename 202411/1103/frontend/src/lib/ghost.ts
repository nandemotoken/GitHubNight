import GhostContentAPI from '@tryghost/content-api';

export const ghost = new GhostContentAPI({
  url: import.meta.env.VITE_GHOST_URL,
  key: import.meta.env.VITE_GHOST_CONTENT_API_KEY,
  version: "v5.0"
});