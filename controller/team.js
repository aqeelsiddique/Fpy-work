// import Resul from '../models/Resultmodel.js'
const { body, validationResult } = require('express-validator');
// const st = require('st');
const Team = require('../model/team');

// let alert = require('alert'); 


// Handle Category create on POST.
exports.Team_create_post = [
  // Validate that the name field is not empty.
  body('teamname', 'Team name required').isLength({ min: 1 }).trim(),
  // Sanitize (trim and escape) the name field.
  body('teamname').trim().escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a category object with escaped and trimmed data.]
    // alert("message you want to show");

    const team = new Team({ teamname: req.body.teamname });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('Team_Add.hbs', {
        title: 'Create Team',
        team: team,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      Team.findOne({ teamname: req.body.teamname 

      
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

            res.render('Team_Add.hbs')
          });
        }
      });
    }
  },
];
// Display list of all Team.
exports.Team_list = function (req, res, next) {
  Team.find().lean()
    .exec(function (err, list_Team) {
      if (err) {
        return next(err);
      }
      
      // Successful, so render.
      res.render('teamlist', {
        title: 'Team List',
        list_Team: list_Team,

        
      });
      console.log(list_Team)
    });
};

///////////////Update A data
exports.update =  (req, res) => {

  Team.findById(req.params.id, (err, doc) => {
    if (!err) {
        res.render("Team_Add.hbs", {
            viewTitle: "Update Employee",
            employee: doc
        });
    }
});
}
// Delete a user with specified user id in the request
exports.teamdelete = (req, res)=>{

  Team.findByIdAndDelete(req.params.id, (err, doc)=>{
    if(!err){
        res.redirect('/teamlist');            
    } else {
        console.log('Error while deleting', err)
    }
});
}
