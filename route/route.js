const controller = require("../controller/questions");
var Controller = require("../controller/questions");

const subject = require("../controller/subject");
const Team = require("../controller/team");
const dashboard = require("../controller/dashboard");
const {
  eventheadregister,
  eventhead_list,
  eventdelete,
} = require("../controller/evenhead");
const multer = require("multer");
const fs = require("fs");
const image = require("../model/image");
const User = require("../model/Head");
const bcrypt = require("bcryptjs");
const path = require("path");
module.exports = function (app) {
  //////////////////////////test 0001
  ////////image code
  // SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
  const upload = multer({
    storage: storage,
  });
  ///////////test image code
  app.get("/test1", function (req, res) {
    res.render("image");
  });
  // app.get("/testimage", async (req, res) => {
  //   const alldata = await User.find();
  //   res.json(alldata);
  // });
  app.post("/uploadphoto",upload.single('myImage'),(req,res)=>{
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer(encode_img,'base64')
    };
    images.create(final_img,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })
})
  // app.post("/imageuploadtest", upload.single("image"), (req, res, next) => {
  //   var obj = {
  //     name: req.body.name,
  //     desc: req.body.desc,
  //     img: {
  //       data: fs.readFileSync(
  //         path.join(__dirname + "/uploads/" + req.file.filename)
  //       ),
  //       contentType: "image/png",
  //     },
  //   };
  //   image.create(obj, (err, item) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       // item.save();
  //       res.redirect("/test1");
  //     }
  //   });
  // });
  //////
  app.get('/test1', (req, res) => {
    image.lean().find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('image', { items: items });
        }
    });
    console.log(items)
});
  app.get("/images", function (req, res) {
    image
      .find()
      .lean()
      .exec(function (err, list_Team) {
        if (err) {
          return next(err);
        }
        // Successful, so render.
        res.render("image", {
          title: "Team List",
          list_Team: list_Team,
        });
        console.log(list_Team);
      });
  });

  //////////////////////////end test code////////

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
  app.post("/subupdate/:id", subject.update);
  app.post("/deltedata/:id", subject.delete);
  app.get("/list_subjects", subject.subject_list);
  //////////////////////////final Question route portion start//////////////
  app.get("/add_Question", (req, res) => {
    res.render("question");
  });
  app.get("/addques", controller.process_create_get);
  app.post("/add_Question", Controller.question_create_post);
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
  app.post("/delete_team/:id", Team.teamdelete);
  app.post("/updateteam/:id", Team.update);
  ///////////////////////////////////Team Section End//////////////////////////////////
  //////////////////EventHead Section////////////////////
  app.get("/evenhead", (req, res) => {
    res.render("Event_head.hbs");
  });
  app.post("/evenhead", (req, res) => {
    res.render("Event_head.hbs");
  });
  // app.post("/register", eventheadregister);
  app.get("/eventheadlists", eventhead_list);
  app.post("/eventhead_team/:id", eventdelete);
  //////////////////End//////////////////////
  ////asyn code
  app.post("/register", upload.single("profile"), async (req, res) => {
    //this code line means agr humy specfie data chaiyae tu yeh estmal kr sgthy
    const { name, email, password, cpassword, image } = req.body;
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
          image: req.file.path,
        });
        ///save hony sy phylae hashed mae change keo password
        await user.save();
        res.status(201).json({ message: "user register succesfully" });
        console.log("user", user);
      }
    } catch (err) {
      console.log(err);
    }
  });
  ///LOGIN  ROUTE
  app.get("/singin", (req, res) => {
    res.render("main", {
      subjecttitle: "Add a Subject",
    });
  });
  app.post("/singin", async (req, res) => {
    try {
      const { name, password } = req.body;
      if (!name) {
        return res.status(400).send({ error: "invalid" });
      }
      const userlogin = await User.findOne({
        name: name,
      });
      if (userlogin) {
        if (!userlogin) {
          res.status(422).send({ message: "user error" });
        } else {
          res.render("main");
        }
      } else {
        res.status(422).send({ message: "invalid" });
      }
    } catch (err) {
      console.log(err);
    }
  });
};
