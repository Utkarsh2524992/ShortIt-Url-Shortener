const express = require("express");
const mongoose = require("mongoose");
const shortID = require("shortid");
const ShortUrl = require("./models/shortUrl");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(console.log("DB connection successful"));

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});
app.post("/shortUrl", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});
app.get("/:shortId", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortId });
  if (shortUrl == null) {
    return res.status(404).send(`Url not found`);
  }
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});
const port = process.env.PORT || 5000;
app.listen(port);
