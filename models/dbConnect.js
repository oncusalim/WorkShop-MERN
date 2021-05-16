const mongoose = require("mongoose");

const db= async ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser : true,
            useUnifiedTopology: true
        })
        console.log("successfully connection")
    }
    catch(err) {
        console.log("db connection fail : ",err)
    }
}

module.exports = db