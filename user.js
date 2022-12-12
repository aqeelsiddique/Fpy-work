
const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({

///////////////////////in bleow schemma not make a code 
    description: String,
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]


})

module.exports = mongoose.model('Quiz', QuestionSchema)


const SubjectSchema = new mongoose.Schema({

    ///////////////////////in bleow schemma not make a code 
    // _id: mongoose.Schema.Types.ObjectId,
    // subjname: { type: String, required: true, lowercase: true, trim: true },
    // _id: Number,
    username: { type: String, required: true, unique: true },
  
    
    
    
    })
    
    module.exports = mongoose.model('Subject', SubjectSchema)
    
    