const mongoose = require('mongoose');

const ConcertSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      unique: true,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    venue: {
      type: String,
      required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    artist: {
      type: String,
      required: true
    },
    image: {
      type: String, 
      required: true
    },
    posts: [{ //we might not need this D
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    }]
});

module.exports = mongoose.model('Concert', ConcertSchema);