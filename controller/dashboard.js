const { body, validationResult } = require("express-validator");
const async = require("async");
const team = require("../model/team");
const subject = require("../model/subject");
const question = require("../model/question");
const User = require("../model/Head");
exports.index = function (req, res) {
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
    },
    

    function (err, results) {
      res.render('dashboard', {
        title: 'Dashboard Home',
        error: err,
        data: results,
      });
    }
  );
};
exports.eventhead_list = function (req, res, next) {
  User.find().lean()
    .exec(function (err, list_EventHead) {
      if (err) {
        return next(err);
      }
     // Successful, so render.
      res.render('dashboard', {
        title: 'list_EventHead List',
        list_EventHead: list_EventHead,  
      });
      console.log(list_EventHead)
    });
};