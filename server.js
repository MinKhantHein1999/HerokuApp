const express = require ('express');
const app = express();
const path = require ('path');
app.use (express.static(__dirname + '/dist/deploy-angular-demo'));
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname+ '/dist/deploy-angular-demo/index.html'))
})
app.listen(process.env.PORT || 8080)
