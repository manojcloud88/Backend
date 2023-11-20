import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productID: {type: String, required: true},
  });
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
    cart: [cartSchema],
}, {collection: "users"});

const userModel = mongoose.model("User", userSchema);

export default userModel;