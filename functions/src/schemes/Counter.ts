const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Counter = new Schema({
  _id: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
    required: true,
  },
});

// export default mongoose.model("counter", Counter);
export default mongoose.model('counter', Counter);
