// host/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  server: { port: 5000 },
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        auth_app: {
          type: "module",
          name: "auth_app",
          entry: "http://localhost:5001/remoteEntry.js",
        },
        booking_app: {
          type: "module",
          name: "booking_app",
          entry: "http://localhost:5002/remoteEntry.js",
        },
        reporting_app: {
          type: "module",
          name: "reporting_app",
          entry: "http://localhost:5003/remoteEntry.js",
        },
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
