// This file serves as the entry point for Vercel's serverless function
// It imports the Angular SSR server and handles requests

export default import("../dist/pushserbia-fe/server/server.mjs").then(
  (module) => module.app,
);
