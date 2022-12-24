var User=require('../model/user');
const Subjectvs = require("../model/user")
const Question = require('../model/question')
const { body, validationResult } = require('express-validator');
var mongoose=require('mongoose');
const subject = require('../model/subject');

///////////////////////////questions Portion COntroller Code /////////////////////Addmin site

// Handle Question create on POST.
const question_create_post = [
  body('ques', 'question must not be empty.').isLength({ min: 1 }).trim(),
  body('option1', 'option1 must not be empty.').isLength({ min: 1 }).trim(),
  body('option2', 'option2 must not be empty.').isLength({ min: 1 }).trim(),
  body('option3', 'option3 must not be empty.').isLength({ min: 1 }).trim(),
  body('option4', 'option4 must not be empty.').isLength({ min: 1 }).trim(),
  body('ans', 'ans must not be empty.').isLength({ min: 1 }).trim(),


  // body('serial_number', 'Serial Number must not be empty')
    // .isLength({ min: 1 })
    // .trim(),
  // Sanitize fields (using wildcard).
  body('*').escape(),
//   body('category.*').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
      // Create a category object with escaped and trimmed data.]
      const question = new Question({
         ques: req.body.name, 
         option1: req.body.option1, 
         option2: req.body.option2 ,
         option3: req.body.option3 ,
         option4: req.body.option4,
         ans: req.body.ans,







        });
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('question.hbs', {
          title: 'Create Question',
          question: question,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.
        // Check if Category with same name already exists.
        Question.findOne({ ques: req.body.ques }).exec(function (
          err,
          found_subject
        ) {
          if (err) {
            return next(err);
          }
          if (found_subject) {
            // Category exists, redirect to its detail page.
            res.redirect(found_subject.url);
          } else {
            question.save(function (err) {
              if (err) {
                return next(err);
              }
              // Category saved. Redirect to category detail page.
              // res.redirect(category.url);
              // alert("message")
  
              res.render('question.hbs')
            });
          }
        });
      }
    },
  ];






// list of all Question.
const question_list = function (req, res, next) {
  Question.find().lean()
    .exec(function (err, list_question) {
      if (err) {
        return next(err);
      }
      
      // Successful, so render.
      res.render('questionlist', {
        title: 'question List',
        list_question: list_question,

        
      });
      console.log(list_question)
    });
};

///////////////Update A data
const updatequestion =  (req, res) => {

    Question.findById(req.params.id, (err, doc) => {
      if (!err) {
          res.render("question.hbs", {
              viewTitle: "Update Employee",
              employee: doc
          });
      }
  });
  }
// Delete a user with specified user id in the request
const deletequestion = (req, res)=>{

    Question.findByIdAndDelete(req.params.id, (err, doc)=>{
      if(!err){
          res.redirect('/showlist');            
      } else {
          console.log('Error while deleting', err)
      }
  });
  }

/////////////////?///////////////End Question Controller Portion/////////////////////

// // var SubjectAddv =  function (req, res, next) {
// // /////////////////create custome function
// //     insertRecord(req, res)
 
// //     // const user = new Subject({
// //     //     _id: mongoose.Types.ObjectId(),
// //     //     name: req.body.name,
// //     //     // address:req.body.address,
// //     //     // salary: req.body.salary
// //     // });
 
// //     // user.save()
// //     // .then(result => {
// //     //     res.status(200).json({
// //     //         docs:[user]
// //     //     });
// //     // })
// //     // .catch(err => {
// //     //     console.log(err);
// //     // });
// // };
// // function insertRecord(req, res)
// // {
// //     var subject = new Subject();
// //     subject.username = req.body.username
// //     subject.save((err, doc) => {
// //         //if no error there 
// //         if(!err){
// //             res.redirect('home')

// //         }
// //         else{
// //             //if error there
// //             console.log("an error there is during addmig subject"+err)
// //         }
// //     })

// // }


// // const AddSubject =async function(req, res)  {
    
// //         try {
         
// //             // const data = req.body
// //             // console.log(data)
    
// //             const Sub  = req.body.Subject
          
            
    
// //             const Subject = await Subject.create({
                
                
// //                Subject
// //             })
    
// //             return res.status(201).json(Subject)
// //         } catch (error) {
// //             return res.status(500).json({"error":error})
// //         }
// //     }
//     /////////////////////////// Final post controller of Add A subject code////


//     var AddSubjects = [ (req, res) =>{
//         try {
//             // const data = req.body
//             // console.log(data)
    
//             // const subjectname = req.body.subjectname
//             const question =  Subjectvs.create({   
//                 subjectname: req.body.subjectname
    
//             })
    
//             return res.status(201).json(question)
//         } catch (error) {
//             return res.status(500).json({"error":error})
//         }
//         // // res.render("index.hbs")
//         // /* Initializing the schema and putting in CRUDcreate */
//         // const Create = new Question({
//         //     description: req.body.description,
//         //     text:req.body.text,
//         //     isCorrect:req.body.isCorrect,
           
            
           
//         // });
//         // console.log(Create)
//         // /* Try Catch */
//         // try{
//         //     /* Saving the data in mongoose */
//         //     const savedCRUD = await Create.save();
//         //     /* Sending the response back */
//         //     res.status(200);
//         //     res.send(savedCRUD);
//         //     console.log(savedCRUD)
            
//         // }catch(err){
//         //     /* Sending the error back */
//         //     res.status(400).send(err);
//         // }  
//     }]
//     const AddSubjectsn = function (req, res) {
//         var myData = new Subjectvs;
//         myData.SubjectName = req.body.SubjectName
//         myData.name = req.body.name
//         myData.save()
//         .then(item => {
//         // res.send("item saved to database");
//         res.render('subject_Add.hbs')
//         })
//         .catch(err => {
//         res.status(400).send("unable to save to database");
//         });
//        };       
// // delete one quiz Subject
// const delSubject = async function(req, res) {
//     try {
//         const _id = req.params.id 

//         const question = await Subject.deleteOne({_id})

//         if(question.deletedCount === 0){
//             return res.status(404).json()
//         }else{
//             return res.status(204).json('delete Sucessfully')

//         }
//     } catch (error) {
//         return res.status(500).json({"error":error})
//     }
// }
//     // var SubjectAdd=   function(req, res, err){
//     //     var myData = new Subject(req.body);
//     //     myData.save()
//     //     .then(item => {
//     //         console.log(myData)
//     //     res.send("item saved to database");
//     //     res.redirect('subject_Add.hbs')
//     //     })
//     //     .catch(err => {
//     //     res.status(400).send("unable to save to database");
//     //     });
//     //     // try {
//     //     //     // const data = req.body
//     //     //     // console.log(data)
//     //     //     // const _id = req.body.Number
    
//     //     //     const  username  = req.body.username
//     //     //     console.log(username)


            
//     //     //     const question = await Subject.create({
//     //     //         // Number:_id,
                

//     //     //         username : username,
    
//     //     //     })
//     //     //     // if(!err) {

//     //     //     //     res.render("subject_Add.hbs")

//     //     //     // }
          
//     //     //     console.log(question)
            
        
//     //     //     // return res.redirect("subject_Add.hbs")

//     //     //     return res.status(201).json(question)
//     //     // } catch (error) {
//     //     //     return res.status(500).json("error"+error)
//     //     // }

        
//     //     // // res.render("index.hbs")
//     //     // /* Initializing the schema and putting in CRUDcreate */
//     //     // const Create = new Question({
//     //     //     description: req.body.description,
//     //     //     text:req.body.text,
//     //     //     isCorrect:req.body.isCorrect,
           
            
           
//     //     // });
//     //     // console.log(Create)
//     //     // /* Try Catch */
//     //     // try{
//     //     //     /* Saving the data in mongoose */
//     //     //     const savedCRUD = await Create.save();
//     //     //     /* Sending the response back */
//     //     //     res.status(200);
//     //     //     res.send(savedCRUD);
//     //     //     console.log(savedCRUD)
            
//     //     // }catch(err){
//     //     //     /* Sending the error back */
//     //     //     res.status(400).send(err);
//     //     // }  
//     // }
//     //////////////////////final subject code/////////////////post method


    
// ////////////////////////End of Subject portion //////////////////////////
// ///////////////////////////////////////////create a question controller////////
// ////////////12/2/2022///
// var create_Question = async function(req, res){
//     try {
//         // const data = req.body
//         // console.log(data)

//         const  {ques} = req.body
//         const {option1}  = req.body
//         const {option2 } = req.body

//         const  {option3}  = req.body

//         const  {option4}  = req.body
//         const  {ans}  = req.body



//         const question = await Question.create({
            
            
//             ques:ques,
//             option1:option1,
//             option2:option2,
//             option3:option3,
//             option4:option4,
//             ans:ans




//         })

//         return res.status(201).json(question)
//     } catch (error) {
//         return res.status(500).json({"error":error})
//     }
//     // // res.render("index.hbs")
//     // /* Initializing the schema and putting in CRUDcreate */
//     // const Create = new Question({
//     //     description: req.body.description,
//     //     text:req.body.text,
//     //     isCorrect:req.body.isCorrect,
       
        
       
//     // });
//     // console.log(Create)
//     // /* Try Catch */
//     // try{
//     //     /* Saving the data in mongoose */
//     //     const savedCRUD = await Create.save();
//     //     /* Sending the response back */
//     //     res.status(200);
//     //     res.send(savedCRUD);
//     //     console.log(savedCRUD)
        
//     // }catch(err){
//     //     /* Sending the error back */
//     //     res.status(400).send(err);
//     // }  
// }
// ////////////////////////
// // var Create=function (req,res){
// // var q=req.body.description;
// // var a=req.body.alternatives;


// // User.create({
// //     description:q,
// //     alternatives:a,
// // },function(err,user){

// // if( err) console.log("error creating user");
// // else{
// //     console.log("Usuario creado correctamente");
// // }
// // });

// // User.find({},function(err,user){
// // if(err) console.log("Hay un error al buscar los usuarios");
// // else{
// //     console.log("Los usuarios encontrados son "+user)
// //        res.json(user);
// //     }        
// // });
// // };

// // get all quiz questions
// const getAllquestions =  async function(req, res) {
//     try {
//         // res.render('getquestion.hbs')
//         const questions = await Question.find()
//         // if(!err){
//         //     res.render('home', {
//         //         list:docs
//         //     })
//         // }
//         return res.status(200).json(questions)  
//     } catch (error) {
//         return res.status(500).json({"error":error})
//     }
// }
// /////////////////get one questions
// const getOnequestion =  async function(req, res) {
//     try {
//         const _id = req.params.id 

//         const question = await Question.findOne({_id})        
//         if(!question){
//             return res.status(404).json({})
//         }else{
//             return res.status(200).json(question)
//         }
//     } catch (error) {
//         return res.status(500).json({"error":error})
//     }
// }


// var Read=function (req,res){
//     res.render("index.hbs")
// // User.find({},function(err,user){
// // if(err) return console.log("error="+err);
// // else{
// //        res.json(user);       
// //     }        
// // });
// };



// // update one quiz question
// const updateQuestion =  async function(req, res) {
//     try {
//         const _id = req.params.id 
//         const { description, alternatives } = req.body

//         let question = await Question.findOne({_id})

//         if(!question){
//             question = await Question.create({
//                 description,
//                 alternatives
//             })    
//             return res.status(201).json(question)
//         }else{
//             question.description = description
//             question.alternatives = alternatives
//             await question.save()
//             return res.status(200).json(question)
//         }
//     } catch (error) {
//         return res.status(500).json({"error":error})
//     }
// }

// // delete one quiz question
// const delQuestion = async function(req, res) {
//     try {
//         const _id = req.params.id 

//         const question = await Question.deleteOne({_id})

//         if(question.deletedCount === 0){
//             return res.status(404).json()
//         }else{
//             return res.status(204).json('delete Sucessfully')

//         }
//     } catch (error) {
//         return res.status(500).json({"error":error})
//     }
// }

module.exports={
    question_create_post,
    question_list,
    updatequestion,
    deletequestion,


//     AddSubjects,
//     delSubject,
//     // SubjectAdd,
//     // category_list,
    

  
//     Read,
//     // AddSubject :AddSubject,
    
//     create_Question:create_Question,
// getAllquestions:getAllquestions,
// getOnequestion,

    
// updateQuestion:updateQuestion,


// delQuestion:delQuestion
}