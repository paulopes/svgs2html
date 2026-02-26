/// <reference types="vite/client" />

declare module 'virtual:svg-files' {
  const entries: Array<{ name: string; content: string }>;
  export default entries;
}
