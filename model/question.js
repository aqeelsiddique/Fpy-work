const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const ObjectId = require('mongodb').ObjectId;
// const id = new ObjectId();
const QuestionSchema = new mongoose.Schema({
    select_subject: { type: String, ref: 'testsubj', required: true },
    


    ques: {
        type: String,

    },
    option1: {
        type: String
    },
    option2: {
        type: String
    },
    option3: {
        type: String
    },
    option4: {
        type: String
    },
    ans: {
        type: String
    }
///////////////////////in bleow schemma not make a code 
    // description: String,
    
    // alternatives: [
    //     {
    //         text: {
    //             type: String,
    //             required: true
    //         },
    //         isCorrect: {
    //             type: Boolean,
    //             required: true,
    //             default: false
    //         }
    //     }
    // ]
})
module.exports = mongoose.model('Question', QuestionSchema)
