const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');

                //  USER REGISTER

router.post('/register',async(req,res)=>{

   // ExistEmail
  const existemail = await User.findOne({ email: req.body.email });

  //password hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  //   createUser
  const userRegister = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
  });

  try {
    if (existemail) {
      return res.json({success : false, message : "Email Already Exist"})
    }
    await userRegister.save();
    res.json({success : true , message : 'User Register Successful'});
  } catch (error) {
    res.json({success : false , message : "Couldn't save user!"})
  }

})


module.exports = router;
