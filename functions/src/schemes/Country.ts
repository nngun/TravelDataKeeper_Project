const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import Counter from './Counter';

const Country = new Schema({
  _id: {
    type: Number,
    // required: true,
  },
  name: {
    type: String,
  },
});

// TODO how to avoid auto id increment conflict for update,get, delete routes
Country.pre('save', async function (next: Function) {
  try {
    // tslint:disable-next-line: no-invalid-this
    const country = this;
    const { count } = await Counter.findByIdAndUpdate({ _id: 'country_id' }, { $inc: { count: 1 } }, { new: true, upsert: true });
    country._id = count;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('country', Country);
