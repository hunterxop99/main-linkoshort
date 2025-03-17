const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const URL_DB = path.join(__dirname, "data", "urls.json");

// Middleware
app.use(express.json());
app.use(cors());

// Load URLs from file
const loadUrls = () => {
    if (!fs.existsSync(URL_DB)) return {};
    return JSON.parse(fs.readFileSync(URL_DB, "utf8"));
};

// Save URLs to file
const saveUrls = (data) => {
    fs.writeFileSync(URL_DB, JSON.stringify(data, null, 2));
};

// Generate random short code
const generateShortCode = () => Math.random().toString(36).substring(2, 8);

// Shorten URL
app.post("/shorten", (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const urls = loadUrls();
    const shortCode = generateShortCode();
    urls[shortCode] = url;
    saveUrls(urls);

    res.json({ shortUrl: `https://x0557tg.vercel.app/${shortCode}` });
});

// Redirect to original URL
app.get("/:shortCode", (req, res) => {
    const urls = loadUrls();
    const originalUrl = urls[req.params.shortCode];

    if (!originalUrl) return res.status(404).json({ error: "Short URL not found" });

    res.redirect(originalUrl);
});

// Start server (for local testing)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
