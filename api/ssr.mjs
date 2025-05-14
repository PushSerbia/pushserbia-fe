import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import express from "express";
import { ngExpressEngine } from "@nguniversal/express-engine";
import { AppServerModule } from "../dist/pushserbia-fe/server/server.mjs";
import "zone.js/node";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Set up the engine
app.engine(
  "html",
  ngExpressEngine({
    bootstrap: AppServerModule,
  }),
);

app.set("view engine", "html");
app.set("views", join(__dirname, "../dist/pushserbia-fe/browser"));

// Serve static files
app.get(
  "*.*",
  express.static(join(__dirname, "../dist/pushserbia-fe/browser"), {
    maxAge: "1y",
  }),
);

// All regular routes use the Universal engine
app.get("*", (req, res) => {
  res.render("index", { req });
});

// This export is required for Vercel
export default function handler(req, res) {
  return app(req, res);
}
