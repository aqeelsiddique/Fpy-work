
const mongoose = require('mongoose')
const imagescheme = mongoose.Schema({
    image: {
        data: Buffer,

        contentType: String,
    }
})


module.exports =  mongoose.model('imagemodel', imagescheme)