import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';


export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    // server: {
    //     https: true,
    // },
    server: {
        host: 'staff-portal.test',
        https: {
            key: fs.readFileSync(
                path.resolve(
                    process.env.HOME,
                    '.config/valet/Certificates/staff-portal.test.key',
                ),
            ),
            cert: fs.readFileSync(
                path.resolve(
                    process.env.HOME,
                    '.config/valet/Certificates/staff-portal.test.crt',
                ),
            ),
        },
        strictPort: false,
        hmr: {
            protocol: 'wss', // Use WebSocket Secure
            host: 'staff-portal.test',
        },
    },
});
