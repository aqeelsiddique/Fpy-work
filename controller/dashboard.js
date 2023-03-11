const { body, validationResult } = require("express-validator");
const async = require("async");
const team = require("../model/team");
const subject = require("../model/subject");
const question = require("../model/question");
const User = require("../model/Head");
// exports.index = function (req, res) {
  // async.parallel(
  //   {
  //     team_count: function (callback) {
  //       team.countDocuments({}, callback);
  //     },
  //     subject_count: function (callback) {
  //       subject.countDocuments({}, callback);
  //     },
  //     question_count: function (callback) {
  //       question.countDocuments({}, callback);
  //     },
  //     eventheadlist: function (callback) {
  //       User.find().lean()
  //       .exec({}, callback)
  //     },
  //   },

    

  //   function (err, results) {
  //     res.render('dashboard', {
  //       title: 'Dashboard Home',
  //       error: err,
  //       data: results,
  //       list_EventHead:results
  //     });
  //     console.log("tttt",results)

  //   }

//   );
  
// };
exports.eventhead_list = function (req, res, next) {
  async.parallel(
    {
      team_count: function (callback) {
        team.countDocuments({}, callback);
      },
      subject_count: function (callback) {
        subject.countDocuments({}, callback);
      },
      question_count: function (callback) {
        question.countDocuments({}, callback);
      },
      eventheadlist: function (callback) {
        User.find().lean().exec(callback)
      },
    },
    function (err, results) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('dashboard', {
        title: 'Admin Dashboard',
          data: results,

        list_EventHead: results.eventheadlist,  
      });
    }
  );
};