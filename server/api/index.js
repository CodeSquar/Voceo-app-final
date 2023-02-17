const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors")

const port = process.env.PORT || 5000;
app.use(cors());

const apiKey = process.env.API_KEY;

app.get("/news/:country/:sortBy/:pagesize", async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${req.params.country}&category=${req.params.sortBy}&apiKey=${apiKey}&page=${req.params.pagesize}`
    );
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.response.data });
  }
});

module.exports = app;