const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
      },
  category: String,
  description: String,
  image: String,
  available: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
