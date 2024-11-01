import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
    esbuild: {
        loader: "tsx",
        // Skip type checking on build
        ignoreAnnotations: true
    },
    build: {
        target: 'esnext',
        minify: false,     // Skips minification to reduce complexity
    },
})
