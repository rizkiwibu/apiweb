const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const helloRoute = require("./routes/helloRoute");
const tiktokRoute = require("./routes/tiktokRoute");
const igstalkRoute = require("./routes/igStalk");
const aiRoute = require("./routes/aiRoute");
const PORT = process.env.PORT || 8000;
const app = express();

// Middleware untuk mem-parsing JSON bodies
app.use(express.json());

// Serve Swagger documentation dengan Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve halaman utama
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Routes
app.use("/", helloRoute);
app.use("/", tiktokRoute);
app.use("/", igstalkRoute);
app.use("/", aiRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server sedang berjalan, mendengarkan port ${PORT}`);
});
