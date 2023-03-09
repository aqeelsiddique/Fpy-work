const controller = require("../controller/questions");
var Controller = require("../controller/questions");
const { ObjectId } = require("mongodb");

const subject = require("../controller/subject");
const subjectmodel = require('../model/subject')
const Team = require("../controller/team");
const team = require("../model/team");

const dashboard = require("../controller/dashboard");
const {
  eventhead_list,
  eventdelete,
  updateprofile,
  updateeventhead,
} = require("../controller/evenhead");
const multer = require("multer");
var fs = require("fs");
const image = require("../model/image");
const User = require("../model/Head");
const bcrypt = require("bcryptjs");
const path = require("path");
const { adminreg, admininfo, admin_lists, admindelete } = require("../controller/admin");
module.exports = function (app) {
  //////////////////////////test 0001//////
  // SET STORAGE
  let storage = multer.diskStorage({
    destination: "./public/images", //directory (folder) setting
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname); // file name setting
    },
  });
  var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/gif"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        cb(new Error("Only jpeg,  jpg , png, and gif Image allow"));
      }
    },
  });
  ///////////test image code
  // app.get("/test1", function (req, res) {
  //   res.render("eventhead.hbs");
  // });

  //////////////////////end test code////////

  // Retrieve all documents in the 'images' collection
  // image.find().toArray(function(err, documents) {
  //   if (err) throw err;

  //   // Render the 'home' template and pass in the array of images as data
  //   res.render('image', { images: documents });

  // });

  ///////////////////dashboard code///////
  app.get("/dashboard", dashboard.index);

  /////////////final done of of Subject Route
  app.get("/AddSub", (req, res) => {
    res.render("subject_Add.hbs", {
      subjecttitle: "Add a Subject",
    });
  });
  app.post("/add_Subject", subject.subject_create_post);

  app.put('/editsubject/:id', subject.subjectupdate );

  app.get('/editsubject/:id', (req, res)=>{
    let readquery = req.params.id;
   
    subjectmodel.findOne({name:readquery})
    .then((x)=>{
        res.render('updatesubject.hbs', {x})
    })
   
})
  app.post("/deltedata/:id", subject.delete);
  app.get("/list_subjects", subject.subject_list);
  //////////////////////////final Question route portion start//////////////
  // app.get("/add_Question", (req, res) => {
  //   res.render("question");
  // });
  app.get("/add_Question", controller.process_create_get1);
  app.post("/add_Question", Controller.process_create_post1);
  app.get("/showlist", controller.question_list);
  app.post("/update_Question/:id", controller.updatequestion);
  app.post("/delete_Question/:id", controller.deletequestion);
  //////////////////////End of Question portion////////////////////////
  ///////////////////////////////////////Team Section/////////////////////////////
  app.get("/createteam", (req, res) => {
    res.render("Team_Add.hbs");
  });
  app.post("/addteam", Team.Team_create_post);
  app.get("/teamlist", Team.Team_list);
  app.get("/delete_team/:id", Team.teamdelete);

  // app.post("/updateteam/:id", Team.update);
  app.get('/editteam/:id', (req, res)=>{
    let readquery = req.params.id;
   
    team.findOne({teamname:readquery})
    .then((x)=>{
        res.render('teamupdate.hbs', {x})
    })
   
})
app.put('/editteam/:id', Team.teamupdate);

  ///////////////////////////////////Team Section End//////////////////////////////////
  //////////////////EventHead Section////////////////////
  app.get("/evenhead", (req, res) => {
    res.render("Event_head.hbs");
  });
  app.get('/edit/:id', (req, res)=>{
    let readquery = req.params.id;
   
    User.findOne({name:readquery})
    .then((x)=>{
        res.render('eventheadupdate.hbs', {x})
    })  
})
app.put('/edit/:id',upload.single("profile"), updateeventhead);
  app.get("/eventheadlists", eventhead_list);
  app.get("/eventhead_team/:id", eventdelete);
  //////////////////End//////////////////////
  ////asyn code
  app.post("/register", upload.single("profile"), async (req, res) => {
    //this code line means agr humy specfie data chaiyae tu yeh estmal kr sgthy
    const { name, email, password, cpassword } = req.body;
    console.log(req.file);

    if (!name || !email || !password || !cpassword) {
      return res.status(422).json({ error: "plz filled the field properly" });
    }
    try {
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.status(422).json({ error: "Email alredy Exist" });
      } else if (password != cpassword) {
        return res.status(422).json({ error: "password are not match" });
      } else {
        const user = new User({
          name,
          email,
          password,
          cpassword,
          image: req.file.filename,
        });
        ///save hony sy phylae hashed mae change keo password
        await user.save();

        res.redirect("/evenhead");

        // res.status(201).json({ message: "user register succesfully" });
        console.log("user", user);
      }
    } catch (err) {
      console.log(err);
    }
  });
  ///LOGIN  ROUTE
  app.post('/login', async (req, res) => {
    const { name, password } = req.body;
  
    // Find the user in the database
    const user = await User.findOne({ name });
  
    // If the user doesn't exist, send an error message
    if (!user) {
      return res.send('Username or password ies incorrect');
    }
  
    // Compare the password with the hash
    const isMatch = await bcrypt.compare(password, user.password);
  
    // If the password doesn't match, send an error message
    if (!isMatch) {
      return res.send('Username or password is incorrect');
    }
  
    // Set the user's session and redirect to the dashboard
    // req.session.user = user;
    res.redirect('/dashboard');
  });
  
  // app.get('/dashboard', (req, res) => {
  //   if (!req.session.user) {
  //     return res.redirect('/');
  //   }
  
  //   res.sendFile(__dirname + '/public/dashboard.html');
  // });

  app.get("/login", (req, res) => {
    res.render("headloginform", {

    });
  });
  app.post("/singin", async (req, res) => {
    try {
      const { name, password } = req.body;
      if (!name && !password) {
        return res.status(400).send({ error: "invalid" });
      }
      const userlogin = await User.findOne({
        name: name,
        password:password
      });
      if (userlogin) {
        if (!userlogin) {
          res.status(422).send({ message: "user error" });
        } else {
          res.render("dashboard.hbs");
        }
      } else {
        res.status(422).send({ message: "invalid" });
      }
    } catch (err) {
      console.log(err);
    }
  });

//////////////Admin code section/////////////
app.get('/admin', (req, res) => {
  res.render('adminprofile.hbs')
})

app.post("/adminreg", upload.single("profile"), adminreg );
app.get("/admininfo", admininfo);
app.get("/adminlists", admin_lists);
app.get("/admindel/:id", admindelete);





};





