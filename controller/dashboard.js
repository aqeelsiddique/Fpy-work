const { body, validationResult } = require("express-validator");
const async = require("async");
const team = require("../model/team");
const subject = require("../model/subject");
const question = require("../model/question");
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
