import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  server: { port: 5003 },
  plugins: [
    react(),
    federation({
      name: "reporting_app",
      filename: "remoteEntry.js",
      exposes: {
        "./ReportDashboard": "./src/exposes/ReportDashboard.tsx",
      },
      remotes: {
        auth_app: "http://localhost:5001/remoteEntry.js",
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
