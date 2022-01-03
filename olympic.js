const express = require('express');
const mongoose = require('mongoose');

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/Olympics");
}

const olymicSchema = mongoose.Schema({

  winnerName:{type:String, required:true},
  country:{type:String, required:true},
  sport:{type:Boolean, required:true},
  age:{type:String, required:true},
  place:{type:Number, required:true}

})
const winner = mongoose.model('winner', olymicSchema);

const app = new express()
app.get('/winners', async (req, res) => {
  try{
    const win = await winner.find().lean().exec()
    return res.send(win)
    
  }
  catch(err) {
    console.log(err.message)
  }
})


app.listen(4500, async (req, res) => {
  await connect()
  console.log('listening to port 4500')
})