const mongoose = require("mongoose");

const comboProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    heading: {
      type: String,
    },
    subHeading: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
        // required: true,
      },
    ],
    products: [
      {
        type:String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ComboProduct", comboProductSchema);
