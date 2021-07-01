const express = require("express");
const server = express();
const connectDb = require("./config/db");
const apiUrl = require("config").get("apiUrl");

server.use(express.json({ extended: true }));

const port = process.env.PORT || 8000;

if (server.get("env") !== "production") {
    const morgan = require("morgan");
    server.use(morgan("tiny"));
}

connectDb();

server.get(`${apiUrl}/test/`, (req, res) =>
    res.send("GET /api/test/ Api is working fine! ")
);

server.listen(port, () => {
    console.log(`PORT:${port} | The server is up and running...`);
});
