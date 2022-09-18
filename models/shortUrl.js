const mongoose = require("mongoose");
const shortId = require("shortid");

const shortUrlSchema = new mongoose.Schema(
  {
    full: {
      type: String,
      required: [true, "Full Url is required"],
    },
    short: {
      type: String,
      required: [true, "Short Url is required"],
      default: shortId.generate,
    },
    clicks: {
      type: Number,
      required: [true, "Cicks is required"],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
