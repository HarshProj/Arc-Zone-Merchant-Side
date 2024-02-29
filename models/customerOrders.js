const mongoose = require("mongoose");

const customerOrderSchema = new mongoose.Schema({
    specific : [{
        userId : String,
        merchantId : String,
        productId : String,
        productName : String,
        productPrice : String,
        merchantName : String,
        userName :String ,
        userEmail : String,
        userPhone : String,
        userAddress : String,
        productpic : String
    }]
})

mongoose.model("CUSTOMERORDER" , customerOrderSchema)