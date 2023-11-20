import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  color: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: String, required: true },
  image: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User model
}, {collections: "products"});

const Product = mongoose.model('Product', productSchema);

export default Product;
