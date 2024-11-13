const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
   zoneName:{
    type: String,
    required: true,
   },
   details:{
    type: String,
   },
   enabled:{
    type: Boolean,
    required: true,
    default: true,
   },
   createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;
