
const mongoose = require('mongoose')
const imagescheme = mongoose.Schema({
   
        image: {
            type: String,
            require: true
           
        }
        // data: Buffer,

        // contentType: String,
   
})


module.exports =  mongoose.model('imagemodel', imagescheme)