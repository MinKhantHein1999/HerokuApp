const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const confit = require ('../router/confit')

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

        // User Login
router.post("/login", async (req, res) => {
  // Checking User Email in Database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({success : false , message:"Invalid Email!"})
  }

  // Valid Password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    // res.status(400).send("Invalid Password");
    return res.json({success : false, message : "Invalid Password"})
  } else {
    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.Token_Secret, {expiresIn : '24hr'});
    res.header("auth-token", token).json({success : true, token: token });
  }
});

module.exports = router;
