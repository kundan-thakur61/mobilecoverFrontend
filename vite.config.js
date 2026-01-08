import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['socket.io-client']
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // Enable minification for smaller bundles
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Advanced code splitting for better caching
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router')) {
            return 'react-core';
          }
          // Redux state management
          if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
            return 'redux';
          }
          // UI libraries
          if (id.includes('framer-motion') || 
              id.includes('react-icons') || 
              id.includes('react-toastify')) {
            return 'ui-libs';
          }
          // Utilities
          if (id.includes('axios') || id.includes('socket.io')) {
            return 'network';
          }
          // Helmet/SEO
          if (id.includes('react-helmet')) {
            return 'seo';
          }
        },
        // Optimize asset filenames for caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    // Enable source maps only in development
    sourcemap: false,
    // CSS optimization
    cssCodeSplit: true,
    // Target modern browsers for smaller bundles
    target: 'es2020',
  },
  // Enable esbuild for faster dev builds
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});
