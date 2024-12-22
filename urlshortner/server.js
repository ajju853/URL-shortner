
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

let urlDatabase = {};

app.post('/shorten', (req, res) => {
    const { longUrl, customKey } = req.body;
    const key = customKey || generateShortUrlKey();

    if (urlDatabase[key]) {
        return res.status(400).json({ error: 'This short URL key already exists. Please choose another one.' });
    }

    urlDatabase[key] = longUrl;
    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${key}` });
});

app.get('/:key', (req, res) => {
    const longUrl = urlDatabase[req.params.key];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

function generateShortUrlKey() {
    return Math.random().toString(36).substring(2, 8); // Generates a random 6-character string
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});