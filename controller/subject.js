// import Resul from '../models/Resultmodel.js'
const { body, validationResult } = require('express-validator');
// const st = require('st');

const Subject = require('../model/subject');

// let alert = require('alert'); 


// Handle Category create on POST.
exports.subject_create_post = [
  // Validate that the name field is not empty.
  body('name', 'Subject name required').isLength({ min: 1 }).trim(),
  // Sanitize (trim and escape) the name field.
  body('name').trim().escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a category object with escaped and trimmed data.]
    // alert("message you want to show");

    const subject = new Subject({ name: req.body.name });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('Subject_Add.hbs', {
        title: 'Create Subject',
        subject: subject,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      Subject.findOne({ name: req.body.name 

      
      }).exec(function (
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
          subject.save(function (err) {
            if (err) {
              return next(err);
            }
            // Category saved. Redirect to category detail page.
            // res.redirect(category.url);
            // alert("message")

            res.render('Subject_Add.hbs')
          });
        }
      });
    }
  },
];
// Display list of all Subject.
exports.subject_list = function (req, res, next) {
  Subject.find().lean()
    .exec(function (err, list_subject) {
      if (err) {
        return next(err);
      }      
      // Successful, so render.
      res.render('subjectmain', {
        title: 'subject List',
        list_subject: list_subject,        
      });
      console.log(list_subject)
    });
};
///////////////Update A data
exports.update =  (req, res) => {
  Subject.findById(req.params.id, (err, doc) => {
    if (!err) {
        res.render("Subject_Add.hbs", {
            viewTitle: "Update subject",
            subject: doc
        });
    }
});
}
// Delete a user with specified user id in the request
exports.delete = (req, res)=>{

  Subject.findByIdAndDelete(req.params.id, (err, doc)=>{
    if(!err){
        res.redirect('/list_subjects');
        console.log("suce",doc)            
    } else {
        console.log('Error while deleting', err)
        console.log("hgyt",doc)            

    }
});
}






