const fs = require("fs");
const path = require("path");
const express = require("express");
const helloRoute = require("./routes/helloRoute");
const tiktokRoute = require("./routes/tiktokRoute");
const igstalkRoute = require("./routes/igStalk");
const aiRoute = require("./routes/aiRoute");
const swaggerAssetsRoute = require("./routes/swaggerAssetsRoute");

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware untuk mem-parsing JSON bodies
app.use(express.json());

// CSS kustom untuk mengubah tampilan Swagger UI

// Serve Swagger documentation beserta CSS kustom
app.use("/api-docs", swaggerAssetsRoute);
app.get("/swagger.json", (req, res) => {
  const swaggerPath = path.join(__dirname, "/swagger.json");

  const swaggerJson = fs.readFileSync(swaggerPath, "utf-8");

  res.setHeader("Content-Type", "application/json");

  res.send(swaggerJson);
});
// Routes
app.use("/", helloRoute);
app.use("/", tiktokRoute);
app.use("/", igstalkRoute);
app.use("/", aiRoute);

// Route untuk halaman utama
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server sedang berjalan, mendengarkan port ${PORT}`);
});
