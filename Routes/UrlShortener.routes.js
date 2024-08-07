const { Router } = require("express");
const { UrlShortenerModel } = require("../Models/UrlShortener.schema");

const URLRouter = Router();

function generateShortUrl(length = 6) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortUrl = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortUrl += characters.charAt(randomIndex);
  }

  return shortUrl;
}

URLRouter.post("/shorturl", async (req, res) => {
  try {
    let { originalURL } = req.body;
    let shortURL = generateShortUrl();
    let url = new UrlShortenerModel({ originalURL, shortURL });
    await url.save();
    res.status(200).send({ msg: "ShortURL Created", url });
  } catch (error) {
    res.status(500).send(error);
  }
});

URLRouter.get("/redirect/:short", async (req, res) => {
  try {
    const short = req.params;
    console.log(short);
    const url = await UrlShortenerModel.findOne({
      shortURL: short.short,
    });
    console.log(url);
    if (url) {
      res.redirect(url.originalURL);
    } else {
      res.status(400).send({ message: "Error in redirectinging" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = {
  URLRouter,
};
