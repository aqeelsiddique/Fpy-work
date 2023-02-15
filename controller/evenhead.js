// import Resul from '../models/Resultmodel.js'
const { body, validationResult } = require('express-validator');
const User = require('../model/Head');
// const st = require('st');

////asyn code
const eventheadregister =  async function(req, res){


  //this code line means agr humy specfie data chaiyae tu yeh estmal kr sgthy
  const {name, email, password, cpassword} = req.body;
  if (!name || !email || !password || !cpassword){
      return res.status(422).json({error: "plz filled the field properly"});
  }
  try {
      const userExist = await User.findOne({ email: email});
      if (userExist) {
          return res.status(422).json({ error: "Email alredy Exist"});
      } else if(password != cpassword) {
          return res.status(422).json({ error: "password are not match"})

      } else {
          const user = new User({name, email, password, cpassword})
          ///save hony sy phylae hashed mae change keo password
           await user.save(); 
          //  alert('howdy')
           // res.status(201).json({ message: "user register succesfully"})
      }
  }
  catch(err) {
      console.log(err);

  } 
};
// list of all Question.
const eventhead_list = function (req, res, next) {
  User.find().lean()
    .exec(function (err, list_EventHead) {
      if (err) {
        return next(err);
      }
     // Successful, so render.
      res.render('event_headlist', {
        title: 'list_EventHead List',
        list_EventHead: list_EventHead,  
      });
      console.log(list_EventHead)

      

    });
};
// Delete a user with specified user id in the request
const eventdelete = (req, res)=>{

  User.findByIdAndDelete(req.params.id, (err, doc)=>{
    if(!err){
        res.redirect('/eventheadlists');            
    } else {
        console.log('Error while deleting', err)
    }
});
}


module.exports = {
  eventheadregister,
  eventhead_list,
  eventdelete
  


}