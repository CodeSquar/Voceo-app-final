const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors")

const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://voceo-app-final-p3fs.vercel.app', 
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

const apiKey = process.env.API_URL;

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