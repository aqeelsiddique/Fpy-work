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
var fs = require('fs');
const image = require("../model/image");
const User = require("../model/Head");
const bcrypt = require("bcryptjs");
const path = require("path");
const savedimage = image.find({})

module.exports = function (app) {
  //////////////////////////test 0001
  ////////image code
  // SET STORAGE
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });
// var upload = multer({ storage: storage });
  // const upload = multer({
  //   dest:"uploads",
  //   limits:{
  //     fileSize:1000000
  //   }
  // });
  let storage = multer.diskStorage({
    destination:'./public/images', //directory (folder) setting
    filename:(req, file, cb)=>{
        cb(null, Date.now()+file.originalname) // file name setting
    }
})

  var upload = multer({ storage: storage,
    fileFilter:(req, file, cb)=>{
      if(
          file.mimetype == 'image/jpeg' ||
          file.mimetype == 'image/jpg' ||
          file.mimetype == 'image/png' ||
          file.mimetype == 'image/gif'
  
      ){
          cb(null, true)
      }
      else{
          cb(null, false);
          cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
      }
     }
   });

  ///////////test image code
  app.get("/test1", function (req, res) {
    res.render("imagee");
  });
  // app.get("/testimage", async (req, res) => {
  //   const alldata = await User.find();
  //   res.json(alldata);
  // });
  app.post("/uploadphoto",upload.single('myImage'),(req,res)=>{
    // res.send()
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer(encode_img,'base64')
    };
    image.create(final_img,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result.img.Buffer);
            console.log("Saved To database");
            console.log("sucessfull")
            // res.contentType(final_img.contentType);
            // res.send(final_img.image);
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
  app.post('/imagee', upload.single('myImage'),  (req, res) => {
    try {
      const { title, description } = req.body;
      const filename = req.file.filename;
      const imagess = new User({ title, description, image:filename });
        imagess.save(function(err,data){
          if(err) throw err;
          res.render('image', {tittle: 'uploaded file', records:data})


        });


      res.redirect('/imagee');
      // console.log(imagess)
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  });
  app.get('/imagee', (req, res)=>{
    User.find({})
    .then((x)=>{
        res.render('image.ejs', {x})
        console.log(x)
    })
    .catch((y)=>{
        console.log(y)
    })

    
})


  // app.get('/imagee', async (req, res) => {

  //   try {
  //     const images = await image.find();

  //     res.render('image.ejs', { images });
  //     // res.send(images)
  //     console.log("ilu",images)
  //   } 
  //   catch (err) {
  //     console.log(err);
  //     res.status(500).send('Server Error');
  //   }
  // });
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
  /////////ejs test
  app.post('/upl', upload.single('image'), (req, res, next) => {
 
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            // data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});
  app.get('/', (req, res) => {
    image.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagee.ejs', { items: items });
            console.log(items)
        }
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
