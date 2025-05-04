import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { resolve } from 'path'
import { builtinModules } from 'module'

const commonjsPackages = [...builtinModules] as const;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist',
    sourcemap: false,
    minify: true,
    lib: {
      entry: resolve(__dirname, './src/index.tsx'),
      formats: ['cjs'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: [
        'react',
        '@nodegui/qode',
        '@nodegui/nodegui',
        '@cervisebas/react-nodegui',
        ...commonjsPackages,
      ],
      plugins: [nodeResolve],
    },
  },
})
