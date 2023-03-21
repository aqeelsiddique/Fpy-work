// import Resul from '../models/Resultmodel.js'
const { body, validationResult } = require("express-validator");
const round = require("../model/round");
// const st = require('st');
const Team = require("../model/team");
const async = require("async");

// let alert = require('alert');
// Handle Category create on POST.

// Update a note identified by the noteId in the request
// Display process create form on GET.
exports.Team_create_get = function (req, res, next) {
  // Get all machines and categories, which we can use for adding to our process.
  // async.parallel(
  //   {
  //     select_round:round.find()
  //     // categories: function (callback) {
  //     //   Category.find(callback);
  //     // },
  //   },
  //   function (err, results) {
  //     if (err) {
  //       return next(err);
  //     }
  //     res.render("Team_Add", {
  //       title: "Create Quiz",
  //       select_round: results.select_round,
  //       // categories: results.categories,
  //     });
  //   }
  // );
  Promise.all([
   
    
    round.find().lean().exec(),

  ])
  .then(([ select_round]) => {
    // Render the view with the data
    res.render('Team_Add', {
      title: 'Add Team',
      data: {
       
        
        select_round
      },
      select_round: select_round
    });
  })
  .catch((err) => {
    // Handle errors here
    return next(err);
  });
};

exports.update12 = (req, res) => {
  // Validate Request
  // if(!req.body.content) {
  //     return res.status(400).send({
  //         message: "Note content can not be empty"
  //     });
  // }

  // Find note and update it with the request body
  Team.findByIdAndUpdate(
    req.params.noteId,
    {

      teamname: req.body.teamname || "Untitled Note",
      member1: req.body.member1,
      member2: req.body.member2,
      member3: req.body.member3,
    },
    { new: true }
  )

    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId,
      });
    });
  res.render("Team_Add.hbs");
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
  body("select_subject", "Machine must not be empty.")
    .isLength({ min: 1 })
    .trim(),
  body("question", "question must not be empty.").isLength({ min: 1 }).trim(),
  body("option1", "option1 must not be empty.").isLength({ min: 1 }).trim(),
  body("option2", "option2 must not be empty.").isLength({ min: 1 }).trim(),
  body("option3", "option3 must not be empty.").isLength({ min: 1 }).trim(),

  body("option4", "option4 must not be empty.").isLength({ min: 1 }).trim(),

  body("ans", "ans must not be empty.").isLength({ min: 1 }).trim(),
  body("*").escape(),
  // body('category.*').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Process object with escaped and trimmed data.
    const process = new question({
      // name: req.body.name,
      select_subject: req.body.select_subject,
      question: req.body.question,
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
          res.render("question", {
            title: "Create Process",
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
        res.redirect("/add_Question");
      });
    }
  },
];

exports.Team_create_post = [
  // Validate that the name field is not empty.
  body("select_round", "Select Round must be empty.")
    .isLength({ min: 1 })
    .trim(),
    body("universityname", "Unvirsity name required").isLength({ min: 1 }).trim(),

  body("teamname", "Team name required").isLength({ min: 1 }).trim(),
  body("member1", "Team name required").isLength({ min: 1 }).trim(),
  body("member2", "Team name required").isLength({ min: 1 }).trim(),
  body("member3", "Team name required").isLength({ min: 1 }).trim(),
  // Sanitize (trim and escape) the name field.
  body("teamname").trim().escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a category object with escaped and trimmed data.]
    // alert("message you want to show");
    const team = new Team({
      select_round: req.body.select_round,
      universityname: req.body.universityname,


      teamname: req.body.teamname,
      member1: req.body.member1,
      member2: req.body.member2,
      member3: req.body.member3,
    });

    if (!errors.isEmpty()) {
        // Get all machines and categories for form.
        async.parallel(
          {
            select_round: function (callback) {
              round.find(callback);
            },
          },
          function (err, results) {
            if (err) {
              return next(err);
            }
            res.render('Team_Add', {
              title: 'Create Team',
              select_round: results.select_round,
              // categories: results.categories,
              team: team,
              errors: errors.array(),
            });
          }
        );
        return;


      // // There are errors. Render the form again with sanitized values/error messages.
      // res.render("Team_Add.hbs", {
      //   title: "Create Team",
      //   team: team,
      //   errors: errors.array(),
      // });
      // return;
    } else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      Team.findOne({ teamname: req.body.teamname }).exec(function (
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

            res.redirect("/createteam");
          });
        }
      });
    }
  },
];
// Display list of all Team.

exports.Team_list = function (req, res, next) {
  Promise.all([
    Team.find().lean().exec()

  ]).then(([list_Team]) => {
    res.render('teamlist' , {
      list_Team:list_Team

    })
  }) 
  
  // Team.find()
  //   .lean()
  //   .exec(function (err, list_Team) {
  //     if (err) {
  //       return next(err);
  //     }

  //     // Successful, so render.
  //     res.render("teamlist", {
  //       title: "Team List",
  //       list_Team: list_Team,
  //     });
  //     console.log(list_Team);
  //   });
};
///////////////Update A data
exports.teamupdate = function (req, res) {
  let readquery = req.params.id;
  Team.updateOne(
    { teamname: readquery },
    {
      $set: {
        teamname: req.body.teamname,
        member1: req.body.member1,
        member2: req.body.member2,
        member3: req.body.member3,
      },
    }
  )
    .then((x) => {
      // req.flash('sucess', 'Your Data has update')
      res.redirect("/createteam");
    })
    .catch((y) => {
      console.log(y);
    });
};
// Delete a user with specified user id in the request
exports.teamdelete = (req, res) => {
  Team.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/teamlist");
    } else {
      console.log("Error while deleting", err);
    }
  });
};
