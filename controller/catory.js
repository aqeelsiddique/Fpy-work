// import Resul from '../models/Resultmodel.js'
const { body, validationResult } = require('express-validator');

const Category = require('../model/category');
// Handle Category create on POST.
exports.category_create_post = [
  // Validate that the name field is not empty.
  body('name', 'Category name required').isLength({ min: 1 }).trim(),

  // Sanitize (trim and escape) the name field.
  body('name').trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data.
    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('Subject_Add.hbs', {
        title: 'Create Category',
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      Category.findOne({ name: req.body.name }).exec(function (
        err,
        found_category
      ) {
        if (err) {
          return next(err);
        }

        if (found_category) {
          // Category exists, redirect to its detail page.
          res.redirect(found_category.url);
        } else {
          category.save(function (err) {
            if (err) {
              return next(err);
            }
            // Category saved. Redirect to category detail page.
            // res.redirect(category.url);
            res.send('succesSS')
          });
        }
      });
    }
  },
];