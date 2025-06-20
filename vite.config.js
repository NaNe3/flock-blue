import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.4.129', // Allows access from your local network
    port: 5173,      // You can change this to your desired port
  },
})