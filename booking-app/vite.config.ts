import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  server: { port: 5002 },
  plugins: [
    react(),
    federation({
      name: "booking_app",
      filename: "remoteEntry.js",
      exposes: {
        "./BookingList": "./src/exposes/BookingList.tsx",
        "./BookingForm": "./src/exposes/BookingForm.tsx",
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
