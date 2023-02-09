
const mongoose = require('mongoose')
const imagescheme = mongoose.Schema({
    image: {
        type: String,

        required: true
    }
})


module.exports =  mongoose.model('imagemodel', imagescheme)