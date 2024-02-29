const express = require("express");
const mongoose = require("mongoose");
const router = express.Router()


const jwt = require("jsonwebtoken");
const requireLogin = require("../middleWares/requireLogin");


const PRODUCT = mongoose.model("PRODUCT")
const MERCHANT = mongoose.model("MERCHANT")


router.post('/createPost',requireLogin ,  (req,res) => {
    const {title , desc , price , pic} = req.body;
    if(!title || !desc || !price ||!pic){
        console.log(title,desc,price,pic)
        return res.status(422).json({error : "Please add all the fields"})
    }

    console.log(req.merchant)
    // return res.json(req.merchant)


    const product = new PRODUCT({
        title,
        desc,
        price,
        pic:pic,
        postedBy: req.merchant
    })

    product.save().then((result) => {
        return res.json({product : result})

    }).catch( err => console.log(err))
    // res.json('Item added')
})




router.get("/myposts",requireLogin , (req,res) => {
    // console.log(req.merchant._id)
    PRODUCT.find({postedBy : req.merchant._id})
    .populate("postedBy" , "_id name")
    .then(myposts => {
        res.json(myposts)
    })
})



router.delete("/deleteProduct/:productid" , async(req , res) => {
    const porductId = req.params.productid;

    PRODUCT.findOne({_id : req.params.productid}).populate("_id")
    .then((product) => {
        product.deleteOne().then(result => {
            return res.json({message : "Product Deleted"})
        })
        .catch((err) => {
            console.log("error")
        })
    })
})






router.get("/getproduct/:productid" , (req,res) => {
    PRODUCT.findOne({_id : req.params.productid})
    .then(product => {
        // console.log(product)
        return res.json(product)
    })
})





router.put('/updateproduct/:productid', async (req, res) => {
    const itemId = req.params.productid;
    const updatedData = req.body;

    try {
        // Find the item by ID and update it in the database
        const updatedItem = await PRODUCT.findByIdAndUpdate(itemId, updatedData, { new: true });

        res.json(updatedItem);
        // return res.json({message : "Product updated"}) 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.post("/getorders", async (req, res) => {
    try {
      // Assuming productIds is an object containing an array under the key "ids"
      let productIds = req.body.cart;
     
  
      const products = await PRODUCT.find({ _id: { $in: productIds } });
  
      console.log(products);
      return res.json(products)
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


router.get("/getitems/:merchantId" ,async (req ,res) => {
    try{
    const merchantId = req.params.merchantId;

    const merchant = await MERCHANT.findById(merchantId)

    // console.log(merchant.order)

    return res.json(merchant.order)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
})


router.put('/items/:id/:merchantId', async(req, res) => {
    try {
        const merchantId = req.params.merchantId;
        const orderId = req.params.id;
    
        // Update the merchant document to remove the order

        const updatedMerchant = await MERCHANT.findByIdAndUpdate(
          merchantId,
          { $pull: { order: { _id: orderId } } },
          { new: true }
        );
    
        if (!updatedMerchant) {
          return res.status(404).json({ error: 'Merchant not found' });
        }
    
        res.status(200).json({ message: 'Order deleted successfully' });
      } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});



router.get("/test/:mid" ,async(req,res) =>  {
    const merchant = req.params.mid
    console.log(merchant)
})
  

  













module.exports = router;