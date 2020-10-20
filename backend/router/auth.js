const router = require('express').Router();

router.get("/",(req,res)=>{
  res.send("<h1>Test Backend</h1>")
})

module.exports = router;
