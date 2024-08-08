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

/**
 * @swagger
 * components:
 *  schemas:
 *      UrlShortner:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto-generated id of the user
 *              originalURL:
 *                  type: string
 *                  description: original url
 *              shortURL:
 *                  type: string
 *                  description: shorten url
 *
 */

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

/**
 * @swagger
 * /url/shorturl:
 *   post:
 *     summary: URL shortener
 *     tags: [Url Shortner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UrlShortner'
 *     responses:
 *       200:
 *         description: URL is successfully shorten
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UrlShortner'
 *       500:
 *         description: Some server error
 */

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

/**
 * @swagger
 * /url/redirect/{short}:
 *   get:
 *     summary:  URL is successfully redirecting
 *     tags: [Url Shortner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UrlShortner'
 *     responses:
 *       200:
 *         description: redirecting to original URL successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UrlShortner'
 *       500:
 *         description: Some server error
 */

module.exports = {
  URLRouter,
};
