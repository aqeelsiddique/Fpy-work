
const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({


    Question: {
        type: String,
        required: 'please enter Question'
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
module.exports = mongoose.model('Quiz', QuestionSchema)
const SubjectSchema = new mongoose.Schema({

    ///////////////////////in bleow schemma not make a code 
    // _id: mongoose.Schema.Types.ObjectId,
    // username: { type: String, required: true, lowercase: true, trim: true },
    //  username : {type : String }
    email: String,
    name:String

    
     
  
    
    
    
    })
    // employeeSchema
var empSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: 'Please enter full name.'
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String
    },
    salary: {
        type: String
    }
});

// email validation
empSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Please enter valid e-mail addtess.');

module.exports =  mongoose.model('empModel', empSchema);
////////////////////////////////////////////
    
    module.exports = mongoose.model('Subjectvs', SubjectSchema)
    module.exports = mongoose.model('Questionvs', QuestionSchema)

    
    