import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
// If using a framework like React, import its plugin too:
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(), // Add your framework plugin here if applicable
  ],
});