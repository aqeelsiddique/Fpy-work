var User=require('./user');
const Subject = require("./user")

var mongoose=require('mongoose');

///////////////////////////Subject Portion COntroller Code /////////////////////Addmin site

var SubjectAddv =  function (req, res, next) {
/////////////////create custome function
    insertRecord(req, res)
 
    // const user = new Subject({
    //     _id: mongoose.Types.ObjectId(),
    //     name: req.body.name,
    //     // address:req.body.address,
    //     // salary: req.body.salary
    // });
 
    // user.save()
    // .then(result => {
    //     res.status(200).json({
    //         docs:[user]
    //     });
    // })
    // .catch(err => {
    //     console.log(err);
    // });
};
function insertRecord(req, res)
{
    var subject = new Subject();
    subject.username = req.body.username
    subject.save((err, doc) => {
        //if no error there 
        if(!err){
            res.redirect('home')

        }
        else{
            //if error there
            console.log("an error there is during addmig subject"+err)
        }
    })

}


const AddSubject =async function(req, res)  {
    
        try {
         
            // const data = req.body
            // console.log(data)
    
            const Sub  = req.body.Subject
          
            
    
            const Subject = await Subject.create({
                
                
               Subject
            })
    
            return res.status(201).json(Subject)
        } catch (error) {
            return res.status(500).json({"error":error})
        }
    }
    ////////////////////////////
    var SubjectAdd=  async function(req, res, err){
        try {
            // const data = req.body
            // console.log(data)
            // const _id = req.body.Number
    
            const  username  = req.body
            console.log(username)


            
            const question = await Subject.create({
                // Number:_id,
                

                username : username,
    
            })
            // if(!err) {

            //     res.render("subject_Add.hbs")

            // }
          
            console.log(question)
            
        
            // return res.redirect("subject_Add.hbs")

            return res.status(201).json(question)
        } catch (error) {
            return res.status(500).json("error"+error)
        }

        
        // // res.render("index.hbs")
        // /* Initializing the schema and putting in CRUDcreate */
        // const Create = new Question({
        //     description: req.body.description,
        //     text:req.body.text,
        //     isCorrect:req.body.isCorrect,
           
            
           
        // });
        // console.log(Create)
        // /* Try Catch */
        // try{
        //     /* Saving the data in mongoose */
        //     const savedCRUD = await Create.save();
        //     /* Sending the response back */
        //     res.status(200);
        //     res.send(savedCRUD);
        //     console.log(savedCRUD)
            
        // }catch(err){
        //     /* Sending the error back */
        //     res.status(400).send(err);
        // }  
    }






////////////////////////End of Subject portion//////////////////////////



///////////////////////////////////////////create a question controller////////
////////////12/2/2022///
var create = async function(req, res){
    try {
        // const data = req.body
        // console.log(data)

        const { description } = req.body
        const { alternatives } = req.body

        const question = await Question.create({
            
            
            description:description,
            alternatives:alternatives
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
    // // res.render("index.hbs")
    // /* Initializing the schema and putting in CRUDcreate */
    // const Create = new Question({
    //     description: req.body.description,
    //     text:req.body.text,
    //     isCorrect:req.body.isCorrect,
       
        
       
    // });
    // console.log(Create)
    // /* Try Catch */
    // try{
    //     /* Saving the data in mongoose */
    //     const savedCRUD = await Create.save();
    //     /* Sending the response back */
    //     res.status(200);
    //     res.send(savedCRUD);
    //     console.log(savedCRUD)
        
    // }catch(err){
    //     /* Sending the error back */
    //     res.status(400).send(err);
    // }  
}
////////////////////////
// var Create=function (req,res){
// var q=req.body.description;
// var a=req.body.alternatives;


// User.create({
//     description:q,
//     alternatives:a,
// },function(err,user){

// if( err) console.log("error creating user");
// else{
//     console.log("Usuario creado correctamente");
// }
// });

// User.find({},function(err,user){
// if(err) console.log("Hay un error al buscar los usuarios");
// else{
//     console.log("Los usuarios encontrados son "+user)
//        res.json(user);
//     }        
// });
// };
// get all quiz questions
const getAllquestions =  async function(req, res) {
    try {
        res.render('getquestion.hbs')

        const questions = await Question.find()
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}
/////////////////get one questions
const getOnequestion =  async function(req, res) {
    try {
        const _id = req.params.id 

        const question = await Question.findOne({_id})        
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}


var Read=function (req,res){
    res.render("index.hbs")
// User.find({},function(err,user){
// if(err) return console.log("error="+err);
// else{
//        res.json(user);       
//     }        
// });
};



// update one quiz question
const updateQuestion =  async function(req, res) {
    try {
        const _id = req.params.id 
        const { description, alternatives } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                alternatives
            })    
            return res.status(201).json(question)
        }else{
            question.description = description
            question.alternatives = alternatives
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}

// delete one quiz question
const delQuestion = async function(req, res) {
    try {
        const _id = req.params.id 

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json('delete Sucessfully')

        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
}

module.exports={
    SubjectAdd,

  
    Read,
    AddSubject :AddSubject,
    
create:create,
getAllquestions:getAllquestions,
getOnequestion,

    
updateQuestion:updateQuestion,


delQuestion:delQuestion
}