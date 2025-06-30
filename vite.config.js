// vite.config.js - Enterprise Pharmaceutical Intelligence Platform Build Configuration
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';
  
  return {
    plugins: [
      react({
        // Enable Fast Refresh
        fastRefresh: isDevelopment,
        // JSX runtime
        jsxRuntime: 'automatic',
        // Babel configuration for production optimizations
        babel: isProduction ? {
          plugins: [
            // Remove console.log statements in production
            ['transform-remove-console', { exclude: ['error', 'warn'] }],
            // Remove PropTypes in production
            ['transform-react-remove-prop-types', { removeImport: true }]
          ]
        } : undefined
      })
    ],
    
    // Development server configuration
    server: {
      port: 5173,
      host: true, // Listen on all addresses
      strictPort: false,
      open: true, // Auto-open browser
      cors: true,
      proxy: {
        // Proxy API requests to backend during development
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path,
          configure: (proxy, options) => {
            proxy.on('error', (err, req, res) => {
              console.log('Proxy error:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Proxying request:', req.method, req.url);
            });
          }
        }
      },
      // Hot Module Replacement
      hmr: {
        overlay: true
      }
    },
    
    // Preview server configuration (for testing production builds)
    preview: {
      port: 4173,
      host: true,
      strictPort: false,
      open: true,
      cors: true
    },
    
    // Build configuration
    build: {
      target: 'es2020',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: !isProduction, // Source maps for development and staging
      minify: isProduction ? 'esbuild' : false,
      cssMinify: isProduction,
      
      // Rollup options
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        },
        output: {
          // Chunk splitting for better caching
          manualChunks: {
            // Vendor chunk for external dependencies
            vendor: ['react', 'react-dom'],
            // Icons chunk
            icons: ['lucide-react'],
            // Utils chunk for utilities
            utils: ['date-fns', 'lodash']
          },
          // Asset naming for better caching
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId 
              ? chunkInfo.facadeModuleId.split('/').pop().replace('.js', '') 
              : 'chunk';
            return `js/${facadeModuleId}-[hash].js`;
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `images/[name]-[hash][extname]`;
            }
            if (/css/i.test(ext)) {
              return `css/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          entryFileNames: 'js/[name]-[hash].js'
        },
        // External dependencies (if using CDN)
        external: isProduction ? [] : [],
        // Plugins for additional optimizations
        plugins: []
      },
      
      // Chunk size warning limit
      chunkSizeWarningLimit: 1000,
      
      // Asset inlining threshold
      assetsInlineLimit: 4096,
      
      // CSS code splitting
      cssCodeSplit: true,
      
      // Report compressed file sizes
      reportCompressedSize: true,
      
      // Write bundle to disk (useful for debugging)
      write: true,
      
      // Empty output directory before build
      emptyOutDir: true
    },
    
    // Dependency optimization
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'lucide-react'
      ],
      exclude: [
        // Exclude any problematic dependencies
      ],
      // ESBuild options for dependency pre-bundling
      esbuildOptions: {
        target: 'es2020',
        jsx: 'automatic'
      }
    },
    
    // CSS configuration
    css: {
      // PostCSS configuration
      postcss: {
        plugins: isProduction ? [
          // Autoprefixer for vendor prefixes
          require('autoprefixer'),
          // CSSnano for minification
          require('cssnano')({
            preset: ['default', {
              discardComments: { removeAll: true },
              normalizeUnicode: false
            }]
          })
        ] : []
      },
      // CSS modules configuration
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: isProduction 
          ? '[hash:base64:5]' 
          : '[name]__[local]___[hash:base64:5]'
      },
      // Preprocessor options
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
    
    // Path resolution
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@services': resolve(__dirname, 'src/services'),
        '@types': resolve(__dirname, 'src/types')
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss']
    },
    
    // Environment variables
    define: {
      // Define global constants
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
      __PROD__: isProduction,
      __DEV__: isDevelopment
    },
    
    // Environment variable prefixes
    envPrefix: ['VITE_', 'REACT_APP_'],
    
    // Base URL for assets
    base: env.VITE_BASE_URL || '/',
    
    // Public directory
    publicDir: 'public',
    
    // Assets directory relative to publicDir
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.ico', '**/*.woff', '**/*.woff2'],
    
    // Worker configuration
    worker: {
      format: 'es',
      plugins: [react()]
    },
    
    // Logging level
    logLevel: isDevelopment ? 'info' : 'warn',
    
    // Clear screen on rebuild
    clearScreen: true,
    
    // ESBuild configuration
    esbuild: {
      target: 'es2020',
      jsx: 'automatic',
      jsxDev: isDevelopment,
      // Remove debugger statements in production
      drop: isProduction ? ['debugger'] : [],
      // Pure annotations for tree shaking
      pure: isProduction ? ['console.log', 'console.info'] : []
    },
    
    // JSON configuration
    json: {
      namedExports: true,
      stringify: false
    }
  };
});

// Plugin configurations for different environments
const getPluginConfig = (mode) => {
  const plugins = [react()];
  
  if (mode === 'production') {
    // Add production-specific plugins
    // Example: Bundle analyzer, compression, etc.
  }
  
  if (mode === 'development') {
    // Add development-specific plugins
    // Example: ESLint, mock service worker, etc.
  }
  
  return plugins;
};