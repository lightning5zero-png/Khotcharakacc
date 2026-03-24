import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-swiper': ['swiper', 'swiper/vue', 'swiper/modules'],
          'vendor-aos': ['aos'],
          'vendor-ui': ['sweetalert2']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
