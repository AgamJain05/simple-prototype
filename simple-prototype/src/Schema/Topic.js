const mongoose = require('mongoose');
const { Schema } = mongoose;

const StepSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  hint: {
    type: String,
    required: true
  }
});

const TopicSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  steps: [StepSchema]
});

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;