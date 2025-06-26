const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/expirations/:ticker', async (req, res) => {
  const { ticker } = req.params;
  const url = `https://finance.yahoo.com/quote/${ticker}/options`;
  const headers = { 'User-Agent': 'Mozilla/5.0' };

  try {
    const { data: html } = await axios.get(url, { headers });
    const $ = cheerio.load(html);

    const options = $('select[name="expirationDate"] option')
      .map((_, el) => parseInt($(el).attr('value')))
      .get();

    res.json(options);
  } catch (err) {
    console.error('Failed to fetch expirations:', err.message);
    res.status(500).send('Expiration scrape failed');
  }
});

app.get('/iv/:ticker/:expiration', async (req, res) => {
  const { ticker, expiration } = req.params;
  const url = `https://finance.yahoo.com/quote/${ticker}/options?date=${expiration}`;
  const headers = { 'User-Agent': 'Mozilla/5.0' };

  try {
    const { data: html } = await axios.get(url, { headers });
    const $ = cheerio.load(html);

    const ivSmile = [];

    $('section[data-test="calls"] table tbody tr').each((_, row) => {
      const tds = $(row).find('td');
      const strike = parseFloat($(tds[2]).text().replace(',', ''));
      const callIV = parseFloat($(tds[10]).text().replace('%', ''));
      if (!isNaN(strike) && !isNaN(callIV)) {
        ivSmile.push({ strike, callIV });
      }
    });

    res.json(ivSmile.sort((a, b) => a.strike - b.strike));
  } catch (err) {
    console.error('Failed to scrape IV data:', err.message);
    res.status(500).send('IV scrape failed');
  }
});

app.listen(3001, () => {
  console.log('IV API running at http://localhost:3001');
});
