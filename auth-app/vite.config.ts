// auth-app/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  server: { port: 5001 },
  plugins: [
    react(),
    federation({
      name: "auth_app",
      filename: "remoteEntry.js",
      exposes: {
        "./Login": "./src/exposes/Login.tsx",
        "./UserProfile": "./src/exposes/UserProfile.tsx",
        // "./Stores": "./src/exposes/Stores.ts",
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
        zustand: { singleton: true, requiredVersion: false },
      },
    }),
  ],
  build: { target: "esnext" },
});
