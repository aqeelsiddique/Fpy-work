var User=require('../model/user');
const subjectvs = require("../model/user")
const Question = require('../model/question')
const { body, validationResult } = require('express-validator');
var mongoose=require('mongoose');
const subject = require('../model/subject');
const async = require('async');
const question = require('../model/question');
///////////////////////////questions Portion COntroller Code /////////////////////Addmin site
// Handle Question create on POST.
// Display process create form on GET.

// Display process create form on GET.
const process_create_get1 = function (req, res, next) {
  // Get all machines and categories, which we can use for adding to our process.

  Promise.all([
    subject.find().lean().exec()

  ]).then(([select_subject]) => {
    res.render('question' , {
      select_subject:select_subject

    })
  }) 
  
  
};

// Handle process create on POST.
const process_create_post1 = [
  // Convert the category to an array.
  // (req, res, next) => {
  //   if (!(req.body.category instanceof Array)) {
  //     if (typeof req.body.category === 'undefined') req.body.category = [];
  //     else req.body.category = new Array(req.body.category);
  //   }
  //   next();
  // },

  // Validate fields.
  // body('name', 'Name must not be empty.').isLength({ min: 1 }).trim(),
  body('select_subject', 'Machine must not be empty.').isLength({ min: 1 }).trim(),
  body('ques', 'question must not be empty.').isLength({ min: 1 }).trim(),
  body('option1', 'option1 must not be empty.').isLength({ min: 1 }).trim(),
  body('option2', 'option2 must not be empty.').isLength({ min: 1 }).trim(),
  body('option3', 'option3 must not be empty.').isLength({ min: 1 }).trim(),

  body('option4', 'option4 must not be empty.').isLength({ min: 1 }).trim(),

  body('ans', 'ans must not be empty.').isLength({ min: 1 }).trim(),
  body('*').escape(),
  // body('category.*').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Process object with escaped and trimmed data.
    const process = new question({
      // name: req.body.name,
      select_subject: req.body.select_subject,
      ques: req.body.ques,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      ans: req.body.ans,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all machines and categories for form.
      async.parallel(
        {
          select_subject: function (callback) {
            subject.find(callback);
          },
        },
        function (err, results) {
          if (err) {
            return next(err);
          }
          res.render('question', {
            title: 'Create Process',
            select_subject: results.select_subject,
            // categories: results.categories,
            process: process,
            errors: errors.array(),
          });
        }
      );
      return;
    } else {
      // Data from form is valid. Save process.
      process.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful - redirect to new process record.
        res.redirect('/add_Question');
      });
    }
  },
];
  ////////////////test end
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
  let readquery = req.params.id;
  question.updateOne(
    { question: readquery },
    {
      $set: {
        select_subject: req.body.select_subject,
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        ans: req.body.ans,
      },
    }
  )
    .then((x) => {
      // req.flash('sucess', 'Your Data has update')
      res.redirect("/add_Question");
    })
    .catch((y) => {
      console.log(y);
    });

  
    
  }
// Delete a user with specified user id in the request
const deletequestion = (req, res)=>{
    Question.findByIdAndDelete(req.params.id, (err, doc)=>{
      if(!err){
          res.redirect('/questionlists');            
      } else {
          console.log('Error while deleting', err)
      }
  });
  }
module.exports={
    
    question_list,
    updatequestion,
    deletequestion,
    process_create_post1,
    process_create_get1

}