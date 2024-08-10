const mongoose = require('mongoose');

const billItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const billSchema = new mongoose.Schema({
  items: [billItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;
