const express = require('express');
const app = express();

// Define your short URLs
const shortUrls = {
  "x0557tg": "https://example.com/target-page",
  "lsx0557": "https://example.com/another-page",
  "x0557tg-0": "https://example.com/different-page"
};

app.get('/', (req, res) => {
  res.send("Short URL service is live! Use /<shortcode> to redirect.");
});

// Handle short links
app.get('/:shortcode', (req, res) => {
  const shortCode = req.params.shortcode;
  const targetUrl = shortUrls[shortCode];

  if (targetUrl) {
    res.redirect(301, targetUrl); // 301 for SEO-friendly redirect
  } else {
    res.status(404).send("Short URL not found.");
  }
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
