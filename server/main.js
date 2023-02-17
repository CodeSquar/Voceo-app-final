const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors")
const port = 5000
app.set('port', process.env.PORT || port)

app.use((cors()))

app.get("/news/:country/:sortBy/:pagesize", async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${req.params.country}&category=${req.params.sortBy}&apiKey=96e8eb32f9f642699193270cbbbc1ebe&page=${req.params.pagesize}`
    );
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.response.data });
  }
});

app.listen(port, () => console.log(`running ${port}.`));