import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/absproxy/8081',
    test: {
        environment: "jsdom",
    },
    server: {
        allowedHosts: ['.cloudfront.net'] 
    },
})
