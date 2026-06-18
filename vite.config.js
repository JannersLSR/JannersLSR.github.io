import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served at root of JannersLSR.github.io (user pages site) -> base '/'.
// Relative base keeps assets resolvable even if moved to a subpath.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: { dedupe: ['react', 'react-dom'] },
  build: {
    outDir: 'dist',
    assetsDir: 'assets-build',
  },
});
