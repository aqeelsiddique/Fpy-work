
const { body, validationResult } = require('express-validator');
const admin = require('../model/admin')


////asyn code
const adminreg = async (req, res) => {
    //this code line means agr humy specfie data chaiyae tu yeh estmal kr sgthy
    const { name, email, password, cpassword } = req.body;
    console.log(req.file);

    if (!name || !email || !password || !cpassword) {
      return res.status(422).json({ error: "plz filled the field properly" });
    }
    try {
      const userExist = await admin.findOne({ email: email });
      if (userExist) {
        return res.status(422).json({ error: "Email alredy Exist" });
      } else if (password != cpassword) {
        return res.status(422).json({ error: "password are not match" });
      } else {
        const user = new admin({
          name,
          email,
          password,
          cpassword,
          image: req.file.filename,
        });
        ///save hony sy phylae hashed mae change keo password
        await user.save();

        res.redirect("/admin");

        // res.status(201).json({ message: "user register succesfully" });
        console.log("user", user);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const admininfo = function (req, res, next) {
    admin.find().lean()
        .exec(function (err, admininfo) {
          if (err) {
            return next(err);
          }
         // Successful, so render.
          res.render('main.hbs', {
            layout: false,
            title: '',
            admininfo: admininfo,  
          });
          console.log("jjjj",admininfo)
        });
    };
    // list of all Question.
const admin_lists = function (req, res, next) {
    admin.find().lean()
        .exec(function (err, lists_admin) {
          if (err) {
            return next(err);
          }
         // Successful, so render.
          res.render('adminlists', {
            title: '',
            lists_admin: lists_admin  
          });
        });
    };
    const admindelete = (req, res)=>{

        admin.findByIdAndDelete(req.params.id, (err, doc)=>{
          if(!err){
              res.redirect('/adminlists');            
          } else {
              console.log('Error while deleting', err)
          }
      });
      }



  module.exports = {
    adminreg,
    admininfo,
    admin_lists,
    admindelete


  }
  