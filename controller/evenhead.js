// import Resul from '../models/Resultmodel.js'
const { body, validationResult } = require('express-validator');
// const st = require('st');
const Eventhaed = require('../model/eventhead');


// Handle Category create on POST.
exports.evenhead_create_post = [
  // Validate that the name field is not empty.
  body('name', 'name required').isLength({ min: 1 }).trim(),
  // Sanitize (trim and escape) the name field.
  body('name').trim().escape(),
    // Validate that the name field is not empty.
    body('email', 'email required').isLength({ min: 1 }).trim(),
    // Sanitize (trim and escape) the name field.
    body('email').trim().escape(),
      // Validate that the name field is not empty.
  body('password', 'password required').isLength({ min: 1 }).trim(),
  // Sanitize (trim and escape) the name field.
  body('password').trim().escape(),
    // Validate that the name field is not empty.
    body('confirmpassword', 'confirm required').isLength({ min: 1 }).trim(),
    // Sanitize (trim and escape) the name field.
    body('confirmpassword').trim().escape(),
  

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a category object with escaped and trimmed data.]
    // alert("message you want to show");

    const team = new Eventhaed({ 

        name: req.body.name ,
        email: req.body.email ,
        password: req.body.password ,
        confirmpassword: req.body.confirmpassword 


    });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('Event_head.hbs', {
        title: 'Create Team',
        team: team,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      Eventhaed.findOne({ 
        name: req.body.name ,
        email: req.body.email ,
        password: req.body.password ,
        confirmpassword: req.body.confirmpassword 

      
      }).exec(function (
        err,
        found_Team
      ) {
        if (err) {
          return next(err);
        }
        if (found_Team) {
          // Category exists, redirect to its detail page.
          res.redirect(found_Team.url);
        } else {
          team.save(function (err) {
            if (err) {
              return next(err);
            }
            // Category saved. Redirect to category detail page.
            // res.redirect(category.url);
            // alert("message")

            res.render('Event_head.hbs')
          });
        }
      });
    }
  },
];