const router = require("express").Router();
const Listing = require ('../model/Listing');
const verify = require("../router/verify");
const multer = require ('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './upload/images',
  filename:(req, file ,cb)=>{
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage : storage
})

// router.post('/upload',upload.single('profile'),(req,res)=>{
//   // console.log(req.file)
//   res.json({
//       success:1,
//       profile_url : `http://localhost:8080/profile/${req.file.filename}`
//   })
//   // res.send("Getting all data")
// })

// create
router.post("/",upload.single('profile'), async (req, res) => {
  const createlisting = new Listing({
    title: req.body.title,
    price: req.body.price,
    locality: req.body.locality,
    details: req.body.details,
    profile_url : `http://localhost:8080/profile/${req.file.filename}`
  });
  try {
    const listingSave = await createlisting.save();
    res.send(listingSave);
  } catch (error) {
    res.json({ message: error });
  }
});

// read all data
router.get("/", async (req, res) => {
  try {
    const readData = await Listing.find();
    res.send(readData);
  } catch (error) {
    res.json({ message: error });
  }
});

// read single data
router.get("/:listingId", async (req, res) => {
  try {
    const singleData = await Listing.findOne({
      _id: req.params.listingId,
    });
    res.send(singleData);
  } catch (error) {
    res.json({ message: error });
  }
});

// update data
router.put("/:updateId", async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      price: req.body.price,
      locality: req.body.locality,
      details: req.body.details,
    };
    const updateData = await Listing.findByIdAndUpdate(
      { _id: req.params.updateId },
      data
    );
    res.send(updateData);
  } catch (error) {
    res.json({ message: error });
  }
});

// delete data
router.delete("/:deleteId", async (req, res) => {
  try {
    const deletedata = await Listing.findByIdAndRemove(req.params.deleteId);
    res.send(deletedata);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
