const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const helloRoute = require("./routes/helloRoute");
const tiktokRoute = require("./routes/tiktokRoute");
const igstalkRoute = require("./routes/igStalk");
const aiRoute = require("./routes/aiRoute");
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());

// CSS kustom untuk mengubah tampilan Swagger UI
const customCss = `
    .swagger-ui .topbar .link {
        display: none;
    }
    .swagger-ui .topbar:before {
        content: "Akuivan13 (Request Fitur Wa 089505520763)";
        display: block;
        font-weight: bold;
        color: black;
        font-size: 20px;
        margin: 15px 0;
        text-align: left;
        padding-left: 80px;
    }
    .swagger-ui .topbar {
        background: url('https://telegra.ph/file/727ec9ce1a059ca515074.jpg') no-repeat;
        background-size: contain;
    }
`;

// Serve Swagger documentation beserta CSS kustom
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));

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
