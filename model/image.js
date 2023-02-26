
const mongoose = require('mongoose')
const imagescheme = mongoose.Schema({
   
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
   
})


module.exports =  mongoose.model('imagemodel', imagescheme)