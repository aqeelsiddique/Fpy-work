const controller = require("../controller/questions");
var Controller = require("../controller/questions");
const Subjectvs = require("../model/user");
const mongoose = require("mongoose");
const empModel = require("../model/user");
const subject = require("../controller/subject");
const Subject = require("../model/subject");
const Question = require("../model/question");
const Team = require('../controller/team')
const  dashboard  = require("../controller/dashboard");
const { evenhead_create_post, eventheadregister, eventhead_list } = require("../controller/evenhead");
const alert =  require ('alert')

const User = require("../model/Head");
module.exports = function (app) {
  //////////////////////////test 0001
  const bcrypt = require('bcryptjs');
///////////////////dashboard code///////
  app.get('/dashboard', dashboard.index);
  /////////////final done of of Subject Route
  app.get("/AddSub", (req, res) => {
    res.render("subject_Add.hbs", {
      subjecttitle: "Add a Subject",
    });
  });
  app.post("/add_Subject", subject.subject_create_post);
  app.post("/update/:id", subject.update);
  app.post("/deltedata/:id", subject.delete);
  app.get("/list_subjects", subject.subject_list);
  //////////////////////////final Question route portion start//////////////
  app.get("/add_Question", (req, res) => {
    res.render("question");
  });
  app.get("/addques", controller.process_create_get);
  app.post("/add_Question", Controller.question_create_post);
  app.get("/showlist", controller.question_list);
  app.get("/update_Question/:id", controller.updatequestion);
  app.post("/delete_Question/:id", controller.deletequestion);
  //////////////////////End of Question portion////////////////////////
  ///////////////////////////////////////Team Section/////////////////////////////
  app.get("/createteam", (req, res) => {
    res.render("Team_Add.hbs");
  });
  app.post("/addteam", Team.Team_create_post)
  app.get("/teamlist",Team.Team_list )
  app.post("/delete_team/:id", Team.teamdelete);
  ///////////////////////////////////Team Section End//////////////////////////////////
  //////////////////EventHead Section////////////////////
  app.get("/evenhead", (req, res) => {
    res.render("Event_head.hbs");
  });
  app.post("/register",eventheadregister )
  app.get('/eventheadlists', eventhead_list)
  //////////////////End//////////////////////
////asyn code
app.post('/register' , async (req, res) =>{
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
          res.status(201).json({ message: "user register succesfully"})
          console.log(user)
      }
  }
  catch(err) {
      console.log(err);
  }
}); 
///LOGIN  ROUTE
app.get("/singin", (req, res) => {
  res.render("main", {
    subjecttitle: "Add a Subject",
  });
});
app.post('/singin', async (req, res)=>{
  try {
      const {name , password} = req.body;
      if (!name) {
          return res.status(400).send({error:"invalid"})
      }    
      const userlogin = await User.findOne({ 
        name: name
       });
      if (userlogin){
          if(!userlogin ) {
              res.status(422).send({message: "user error"})
          } else {
            res.render('main');
              // res.send({meassage:" wellcome user  login sucessfully"})            
          }
      } 
      else {
          res.status(422).send({message: "invalid"})
      }
  } catch(err) {
      console.log(err);
  }
  // console.log(req.body);
  // res.send({message:"awesome"});
})
  app.get("/test1", function (req, res) {
    res.render("teamlist");
  });

};
