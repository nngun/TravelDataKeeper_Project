const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountryScheme = new Schema({
  _id: { type: Number, required: false },
  name: {
    type: String,
  },
});

const CategoryScheme = new Schema({
  _id: { type: mongoose.ObjectId, default: new mongoose.Types.ObjectId(), required: false },
  name: {
    type: String,
  },
  color: {
    type: String,
  },
  countries: [CountryScheme],
});

const MapScheme = new Schema({
  _id: { type: mongoose.ObjectId, default: new mongoose.Types.ObjectId(), required: false },
  title: {
    type: String,
  },
  restColor: {
    type: String,
  },
  bgColor: {
    type: String,
  },
  categories: [CategoryScheme],
});

const UserScheme = new Schema({
  _id: mongoose.ObjectId,
  name: {
    type: String,
  },
  lname: {
    type: String,
  },
  role: {
    type: String,
    default: 'User',
  },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  map: {
    type: MapScheme,
    default: {
      title: 'Custom Map',
      restColor: '#9966FF',
      bgColor: '#66FF66',
      categories: [],
    },
  },
});

// export default mongoose.model("user", User);
export const Category = mongoose.model('category', CategoryScheme);
export const Map = mongoose.model('map', MapScheme);
export const User = mongoose.model('user', UserScheme);
