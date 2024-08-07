const mongoose = require("mongoose");

const UrlShortenerSchema = mongoose.Schema({
  originalURL: { type: String, require: true },
  shortURL: { type: String, unique: true },
});

const UrlShortenerModel = mongoose.model("urlShortener", UrlShortenerSchema);

module.exports = {
  UrlShortenerModel,
};
