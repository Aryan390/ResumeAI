import { createServer as createViteServer } from "vite";
import { createServer } from "http";
import express from "express";
import path from "path";

export function log(message, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app, server) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  });

  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);

  const wss = new Set();
  server.on("upgrade", (request, socket, head) => {
    if (request.url === "/vite-hmr") {
      vite.ws.handleUpgrade(request, socket, head, (ws) => {
        wss.add(ws);
        ws.on("close", () => wss.delete(ws));
      });
    }
  });

  log("Vite server set up for development");
}

export function serveStatic(app) {
  app.use(express.static("dist/public"));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve("dist/public/index.html"));
  });

  log("Static files served for production");
}