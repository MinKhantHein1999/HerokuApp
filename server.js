const express = require ('express');
const app = express();
const path = require ('path');
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect("mongodb+srv://mkh:mkh123@cluster0.sfe2d.mongodb.net/<dbname>?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true } ,()=>{
    console.log("Successful Database Connection");
})


app.use (express.static(__dirname + '/dist/deploy-angular-demo'));
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname+ '/dist/deploy-angular-demo/index.html'))
})

app.use(cors());
app.use(express.json());

const appRouter = require('./backend/router/auth');
app.use ('/api/auth',appRouter);

app.listen(process.env.PORT || 8080,()=>{
  console.log("server is running on port 8080")
})
