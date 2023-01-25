var User=require('../model/user');
const subjectvs = require("../model/user")
const Question = require('../model/question')
const { body, validationResult } = require('express-validator');
var mongoose=require('mongoose');
const subject = require('../model/subject');
const async = require('async');

///////////////////////////questions Portion COntroller Code /////////////////////Addmin site
// Handle Question create on POST.

// Display process create form on GET.
const process_create_get = function (req, res, next) {
  // Get all machines and categories, which we can use for adding to our process.
  async.parallel(
    {
      subjects: function (callback) {
        subject.find(callback).lean();
      },
     
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render('question', {
        title: 'Create Subject',
        subjects: results.subjects,
      });
    }
  );
};
const question_create_post = [
  // body('select_subject', 'subject must not be empty.').isLength({ min: 1 }).trim(),
  body('ques', 'question must not be empty.').isLength({ min: 1 }).trim(),
  body('option1', 'option1 must not be empty.').isLength({ min: 1 }).trim(),
  body('option2', 'option2 must not be empty.').isLength({ min: 1 }).trim(),
  body('option3', 'option3 must not be empty.').isLength({ min: 1 }).trim(),
  body('option4', 'option4 must not be empty.').isLength({ min: 1 }).trim(),
  body('ans', 'ans must not be empty.').isLength({ min: 1 }).trim(), 
  body('*').escape(),
//   body('category.*').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
      // Create a category object with escaped and trimmed data.]
      const question = new Question({
        // select_subject: req.body.select_subject, 
         ques: req.body.ques, 
         option1: req.body.option1, 
         option2: req.body.option2 ,
         option3: req.body.option3 ,
         option4: req.body.option4,
         ans: req.body.ans,
        });
          ////////////update code
        if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/error messages.
          // Get all machines and  categories for form.
          async.parallel(
            {
              select_subjects: function (callback) {
                subject.find(callback).lean();
              }
            },
            function (err, results) {
              if (err) {
                return next(err);
              }
              console.log(results) 
              // Mark our selected categories as checked.
              // for (let i = 0; i < results.select_subject.length; i++) {
              //   if (process.category.indexOf(results.select_subject[i]._id) > -1) {
              //     results.select_subject[i].checked = 'checked';
              //   }
              // }
              res.render('question', {
                title: 'Create Process',
                select_subjects: results.select_subjects,
                question: results.question,
                errors: errors.array(),
              });
            }
          );
          return;
        } else {
          // Data from form is valid. Save process.
          question.save(function (err) {
            if (err) {
              return next(err);
            }
            //successful - redirect to new process record.
            res.redirect('add_Question');
            console.log(question)
          });
        }
      },
    ];
  //     if (!errors.isEmpty()) {
        
  //       // There are errors. Render the form again with sanitized values/error messages.
  //       res.render('question.hbs', {
  //         title: 'Create Question',
  //         question: question,
  //         errors: errors.array(),
  //       });
  //       return;
  //     } 
  //     else {
  //       // Data from form is valid.
  //       // Check if Category with same name already exists.
  //       Question.findOne({ ques: req.body.ques }).exec(function (
  //         err,
  //         found_subject
  //       ) {
  //         if (err) {
  //           return next(err);
  //         }
  //         if (found_subject) {
  //           // Category exists, redirect to its detail page.
  //           res.redirect(found_subject.url);
  //         } else {
  //           question.save(function (err) {
  //             if (err) {
  //               return next(err);
  //             }
  //             // Category saved. Redirect to category detail page.
  //             // res.redirect(category.url);
  //             // alert("message")
  
  //             res.render('question.hbs')
  //           });
  //         }
  //       });
  //     }
  //   },
  // ];






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

// // var subjectAddv =  function (req, res, next) {
// // /////////////////create custome function
// //     insertRecord(req, res)
 
// //     // const user = new subject({
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
// //     var subject = new subject();
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


// // const Addsubject =async function(req, res)  {
    
// //         try {
         
// //             // const data = req.body
// //             // console.log(data)
    
// //             const Sub  = req.body.subject
          
            
    
// //             const subject = await subject.create({
                
                
// //                subject
// //             })
    
// //             return res.status(201).json(subject)
// //         } catch (error) {
// //             return res.status(500).json({"error":error})
// //         }
// //     }
//     /////////////////////////// Final post controller of Add A subject code////


//     var Addsubjects = [ (req, res) =>{
//         try {
//             // const data = req.body
//             // console.log(data)
    
//             // const subjectname = req.body.subjectname
//             const question =  subjectvs.create({   
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
//     const Addsubjectsn = function (req, res) {
//         var myData = new subjectvs;
//         myData.subjectName = req.body.subjectName
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
// // delete one quiz subject
// const delsubject = async function(req, res) {
//     try {
//         const _id = req.params.id 

//         const question = await subject.deleteOne({_id})

//         if(question.deletedCount === 0){
//             return res.status(404).json()
//         }else{
//             return res.status(204).json('delete Sucessfully')

//         }
//     } catch (error) {
//         return res.status(500).json({"error":error})
//     }
// }
//     // var subjectAdd=   function(req, res, err){
//     //     var myData = new subject(req.body);
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


            
//     //     //     const question = await subject.create({
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


    
// ////////////////////////End of subject portion //////////////////////////
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
    process_create_get

//     Addsubjects,
//     delsubject,
//     // subjectAdd,
//     // category_list,
    

  
//     Read,
//     // Addsubject :Addsubject,
    
//     create_Question:create_Question,
// getAllquestions:getAllquestions,
// getOnequestion,

    
// updateQuestion:updateQuestion,


// delQuestion:delQuestion
}