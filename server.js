const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const urlDatabase = {}; // Store shortened URLs

// Generate random string for shortened URL
const generateShortCode = () => Math.random().toString(36).substring(7);

app.post('/shorten', (req, res) => {
    const { longUrl } = req.body;
    const shortCode = generateShortCode();
    urlDatabase[shortCode] = longUrl;
    res.json({ shortUrl: `https://x0557tg.vercel.app/${shortCode}` });
});

app.get('/:code', (req, res) => {
    const longUrl = urlDatabase[req.params.code];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send("Not Found");
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
