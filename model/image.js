
const mongoose = require('mongoose')
const imagescheme = mongoose.Schema({
    title: String,
    description: String,
    filename: String
    // img:{data:Buffer,contentType: String}

   
    // name: String,
    // desc: String,
    // img:{
    //     data: Buffer,
    //     contentType: String
    // }
   
})


module.exports =  mongoose.model('imagemodel', imagescheme)