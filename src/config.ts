export const BASE_URL =
  (typeof process !== 'undefined' && process.env && process.env.VITE_BASE_URL)
    ? process.env.VITE_BASE_URL
    : 'http://localhost:8000'; 