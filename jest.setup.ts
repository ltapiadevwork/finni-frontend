import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}

// Polyfill import.meta.env for Jest
globalThis.import = globalThis.import || {};
Object.defineProperty(globalThis, 'import', {
  value: globalThis.import,
  configurable: true,
});
Object.defineProperty(globalThis.import, 'meta', {
  value: { env: { VITE_BASE_URL: 'http://localhost:8000' } },
  configurable: true,
}); 