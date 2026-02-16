import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      tailwindcss(),
    ],
    // define: {
    //   'process.env': env
    // }
     server: {
    port: 3000,
  },
  
  };
});
