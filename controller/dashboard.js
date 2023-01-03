const { body, validationResult } = require('express-validator');
const async = require('async');

exports.index = function (req, res) {
    async.parallel(
    //   {
    //     process_count: function (callback) {
    //       Process.countDocuments({}, callback);
    //     },
        
    //     machine_count: function (callback) {
    //       Machine.countDocuments({}, callback);
    //     },
    //     category_count: function (callback) {
    //       Category.countDocuments({}, callback);
    //     },
    //   },
      function (err, results) {
        res.render('index', {
          title: 'Dashboard Home',
          error: err,
        //   data: results,
        });
      }
    );
  };
  