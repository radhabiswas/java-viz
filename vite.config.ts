import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

/** Public URL path where the app is hosted (must end with `/`). Examples: `/`, `/projects/javaviz/` */
function normalizeBase(raw: string | undefined): string {
  if (raw === undefined || raw === '' || raw === '/') return '/';
  let t = raw.trim();
  if (!t.startsWith('/')) t = `/${t}`;
  return t.endsWith('/') ? t : `${t}/`;
}

export default defineConfig(() => {
  const base = normalizeBase(process.env.JAVAVIZ_BASE ?? process.env.VITE_BASE_PATH);
  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
