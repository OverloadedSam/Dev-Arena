const express = require("express");
const server = express();
const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const apiUrl = require("config").get("apiUrl");

server.use(express.json({ extended: true }));

// Routers
const userRoutes = require("./routes/users");
const loginRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profiles");
const postRoutes = require("./routes/posts");

if (server.get("env") !== "production") {
    const morgan = require("morgan");
    server.use(morgan("tiny"));
}

connectDb();

// Routes
server.use(apiUrl, userRoutes);
server.use(apiUrl, loginRoutes);
server.use(apiUrl, profileRoutes);
server.use(apiUrl, postRoutes);

server.use(errorHandler); // Custom error handler.

server.get(`${apiUrl}/test/`, (req, res) =>
    res.send("GET /api/test/ Api is working fine! ")
);

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`PORT:${port} | The server is up and running...`);
});
