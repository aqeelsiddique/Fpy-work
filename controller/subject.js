// import Resul from '../models/Resultmodel.js'
const { body, validationResult } = require('express-validator');
// const st = require('st');

const Subject = require('../model/subject');
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
    // Create a category object with escaped and trimmed data.
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
            res.send('succesSS')
          });
        }
      });
    }
  },
];
///////////////Update A data
exports.update =  (req, res) => {

  Subject.findById(req.params.id, (err, doc) => {
    if (!err) {
        res.render("Subject_Add.hbs", {
            viewTitle: "Update Employee",
            employee: doc
        });
    }
});
  // if(!req.body){
  //   return res.status(400).send({message:"data to update cannot b empty"})
  // }
  // const id = req.params.id;
  // Subject.findByIdAndUpdate(id, req.body, {userFindAndModify: false})
  // .then(data => {
  //   if(!data) {
  //    res.status(400).send({message:`data cannot update admin with ${id}`})
  //   }
  //   else {
  //     res.send(data)
  //   }
    
  // }).catch(err => {
  //   res.status(500).send({message:"Error update a data"})
  // })

}
// Delete a user with specified user id in the request
exports.delete = (req, res)=>{

  Subject.findByIdAndDelete(req.params.id, (err, doc)=>{
    if(!err){
        res.redirect('/list_subjects');            
    } else {
        console.log('Error while deleting', err)
    }
});
  // const id = req.params.id;

  // Subject.findByIdAndDelete(id)
  //     .then(data => {
  //         if(!data){
  //             res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
  //         }else{
  //             res.send({
  //                 message : "User was deleted successfully!"
  //             })
  //         }
  //     })
  //     .catch(err =>{
  //         res.status(500).send({
  //             message: "Could not delete User with id=" + id
  //         });
  //     });
}




// delete one quiz Subject

// Display Category delete form on GET.
// exports.category_delete_get = function (req, res, next) {
//   st.parallel(
//     {
//       category: function (callback) {
//         Subject.findById(req.params.id).exec(callback);
//       },
//       category_processes: function (callback) {
//         Process.find({ category: req.params.id }).exec(callback);
//       },
//     },
//     function (err, results) {
//       if (err) {
//         return next(err);
//       }
//       if (results.category == null) {
//         // No results.
//         res.redirect('/list_subjects');
//       }
//       // Successful, so render.
//       res.render('/list_subjects', {
//         title: 'Delete Category',
//         category: results.category,
//         category_processes: results.category_processes,
//       });
//     }
//   );
// };
// exports.delSubject = st function(req, res) {
//   try {
//       const _id = req.params.id 
//       const question = await Subject.deleteOne({_id})
//       if(question.deletedCount === 0){
//           return res.status(404).json()
//       }
//       else{
//           // return res.status(204).json('delete Sucessfully')
//           res.redirect('/list_subjects' )
//       }
//   } catch (error) {
//     // return res.redirect('list_subjects')
//     // return res.send('succesSS')
//     return res.status(500).json({"error":error})
//   }
// }
// Handle Category delete on POST.
exports.category_delete_post = function (req, res, next) {
  st.parallel(
    {
      category: function (callback) {
        Subject.findById(req.params.id).exec(callback);
      }
      // category_processes: function (callback) {
      //   Process.find({ category: req.params.id }).exec(callback);
      // },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      // // Success
      // if (results.category_processes.length > 0) {
      //   // Category has pprocesses. Render in same way as for GET route.
      //   res.render('category_delete', {
      //     title: 'Delete Category',
      //     category: results.category,
      //     category_processes: results.category_processes,
      //   });
      //   return;
      // }
       else {
        // Category has no pprocesses. Delete object and redirect to the list of categories.
        Subject.findByIdAndRemove(req.body.id, function deleteCategory(err) {
          if (err) {
            return next(err);
          }
          // Success - go to categories list.
          res.redirect('/list_subjects');
        });
      }
    }
  );
};





// Display list of all Category.
exports.subject_list = function (req, res, next) {
  Subject.find().lean()
    .exec(function (err, list_subject) {
      if (err) {
        return next(err);
      }
      
      // Successful, so render.
      res.render('home', {
        title: 'subject List',
        list_subject: list_subject,

        
      });
      console.log(list_subject)
    });
};
