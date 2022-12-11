
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
    
    module.exports = mongoose.model('Subject', SubjectSchema)
    
    