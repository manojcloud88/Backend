import express from 'express'
import { connect } from 'mongoose'
import userRoute from './routes/userRoute'
import { json } from 'body-parser'
import { MONGODB_URL } from './config'
import { config as _config } from 'dotenv'
import { products } from './data'

_config();

const mongodbUrl = MONGODB_URL;
connect(mongodbUrl).catch(error => console.log(error.reason));

const app = express();
app.use(json());

import cors from "cors"
app.use(cors());

app.use("/api/users", userRoute);
app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find(x => x._id === productId);

  if (product) {
    res.send(product);
  } else {
   res.status(404).send({ msg: "Product Not Found" });
  }
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
