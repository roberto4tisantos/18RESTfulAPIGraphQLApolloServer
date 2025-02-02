import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3001,
//     open: true,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3001',
//         secure: false,
//         changeOrigin: true
//       }
//     }
//   }
// })

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@apollo/client': path.resolve(__dirname, 'node_modules/@apollo/client')
    }
  },
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      }
    }
  }
})
