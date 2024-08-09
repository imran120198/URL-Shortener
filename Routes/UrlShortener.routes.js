const { Router } = require("express");
const crypto = require("crypto");
const { UrlShortenerModel } = require("../Models/UrlShortener.schema");

const URLRouter = Router();

// Function to generate a short URL
function generateShortUrl(length = 6) {
  const baseString = `${Date.now()}-${Math.random()}`;
  console.log("baseString:", baseString);
  const hash = crypto.createHash("md5").update(baseString).digest("hex");
  console.log("hash:", hash);
  console.log(hash.substring(0, length));
  return hash.substring(0, length);
}

// Function to validate URLs
function isValidUrl(url) {
  const regex = /^(http|https|www):\/\/[^ "]+$/;
  return regex.test(url);
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
 *                  description: Original URL
 *              shortURL:
 *                  type: string
 *                  description: Shortened URL
 */

URLRouter.post("/shorturl", async (req, res) => {
  try {
    let { originalURL } = req.body;
    if (!isValidUrl(originalURL)) {
      return res.status(400).send({ msg: "Invalid URL format" });
    }

    let existingUrl = await UrlShortenerModel.findOne({ originalURL });
    if (existingUrl) {
      return res
        .status(200)
        .send({ msg: "ShortURL already exists", url: existingUrl });
    }

    let shortURL = generateShortUrl();
    console.log("shortURL:", shortURL);

    while (await UrlShortenerModel.findOne({ shortURL })) {
      shortURL = generateShortUrl();
    }

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
 *         description: URL is successfully shortened
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UrlShortner'
 *       500:
 *         description: Some server error
 */

URLRouter.get("/redirect/:short", async (req, res) => {
  try {
    const { short } = req.params;
    const url = await UrlShortenerModel.findOne({ shortURL: short });

    if (url) {
      res.redirect(url.originalURL);
    } else {
      res.status(400).send({ message: "Error redirecting" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /url/redirect/{short}:
 *   get:
 *     summary: Redirecting to the original URL
 *     tags: [Url Shortner]
 *     parameters:
 *       - name: short
 *         in: path
 *         required: true
 *         description: The short URL identifier
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Redirecting to the original URL successfully
 *       500:
 *         description: Some server error
 */

module.exports = {
  URLRouter,
};
