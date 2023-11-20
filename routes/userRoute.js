import express from 'express';
import User from '../models/userModel.js';
import { getToken } from '../util.js';
import Product from '../models/productModel.js';

const router = express.Router();

router.post('/signin', async(req,res) => {
    console.log("hi");
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    console.log(signinUser);
    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })

    }else{
        res.send(401).send({msg: 'Invalid Email or Password.'});
    }
})

router.post('/register', async(req,res) => {
    console.log("hi");
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const newUser = await user.save();
    if(newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    }else{
        res.send(401).send({msg: 'Invalid User Data.'});
    }
})


router.get("/createadmin", async(req,res) => {
    try{
        const user = new User({
            name: 'Nishika',
            email: 'hem@gmail.com',
            password: 'hem',
            isAdmin: true,
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
            res.send({msg: error.message});
          
    }

});

router.get("/show",async (req,res)=>{
    try{
        const data = await Product.find();
   
    if(data){
        res.json(data);
    }
    else{
        res.json("Waiting");
    }
    }
    catch(e){
        res.json(e);
}
});
router.get("/show/:id",async (req,res)=>{
    const parentid = req.params.id
    try{
        const data = await User.findOne({_id:parentid});
   
    if(data){
        res.json(data);
    }
    else{
        res.json("Waiting");
    }
    }
    catch(e){
        res.json(e);
}
});

router.post("/create/:id", async (req, res) => {
   const id = req.params.id;
    const { productID } = req.body;
    const cart = {
        productID: productID,
    };
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { $push: {cart: cart} },
        { new: true } 
      );
      if (updatedUser) {
        res.json("ADDED");
      } else {
        res.json("User not found");
      }
    } catch (e) {
      res.json(e);
}
});

router.delete('/delete-task/:parentid/:productId', async (req, res) => {
    const id = req.params.parentid;
    const productId = req.params.productId;

    try {
        const parentDocument = await User.findOne({ _id: id });
        parentDocument.cart = parentDocument.cart.filter(item => item.productID !== productId);

        // Save the updated document
        await parentDocument.save();

        res.send('Task deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;