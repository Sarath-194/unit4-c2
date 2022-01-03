const express = require('express')
const mongoose = require('mongoose')

const connect = () => {
  return mongoose.connect('mongodb://127.0.0.1:27017/eComm')
}

const productSchema = mongoose.Schema({

  productName:{type:String, required:true},
  RS:{type:Number, required:true},
  color:{type:String, required:true},
  Men:{type:Boolean, required:true}
  
}) 

const product = mongoose.model('product', productSchema);

const app = new express()

app.get('/products', async (req,res) => {

  try{
    const products = await product.find().lean().exec();
    return res.send(products);
  }
  catch(err) {
    console.log(err.message);
  }

})
//find all products which are higher than Rs.500

app.get('/products/price', async (req,res) => {

  try{
    const products = await product.find({RS:{$gt:500}},{_id:0, id:0}).lean().exec();
    return res.send(products);
  }
  catch(err) {
    console.log(err.message);
  }

})

// find all the products which are available in more than 3 different colours
app.get('/products/color', async (req,res) => {

  try{
    const products = await product.find({color:{$eq:"Teal"}}).lean().exec();
    return res.send(products);
  }
  catch(err) {
    console.log(err.message);
  }

})

//find all the products which have atleast 1 colour that matches.
app.get('/products/color/Red', async (req,res) => {

  try{
    const products = await product.find({color:{$eq:"Red"}}).limit(1).lean().exec();
    return res.send(products);
  }
  catch(err) {
    console.log(err.message);
  }

})
//find the products which can be used by men and women.
app.get('/products/both', async (req,res) => {

  try{
    const products = await product.find({$or:[{Men:{$eq:true}},{Men:{$eq:false}}]}).lean().exec();
    return res.send(products);
  }
  catch(err) {
    console.log(err.message);
  }

})

app.listen(5000, async () => {
  await connect();
  console.log('listening to port 5000')
})