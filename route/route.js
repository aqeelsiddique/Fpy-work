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

  app.get('/te', dashboard.index);


  ///////////////////dashboard code///////
  app.get("/dashboard", function (req, res) {
    res.render("dashboard");
  });
  /////////////final done of of Subject Route
  app.get("/AddSub", (req, res) => {
    res.render("subject_Add.hbs", {
      subjecttitle: "Add a Subject",
    });
  });
  app.post("/add_Subject", subject.subject_create_post);
  app.get("/update/:id", subject.update);
  app.get("/deltedata/:id", subject.delete);
  app.get("/list_subjects", subject.subject_list);
  // app.get('/delSubject/:id', subject.category_delete_get)
  // (req, res)=> {
  //     Subject.findByIdAndRemove(req.params.id,
  //         (er, docs) => {
  //         if(!er){
  //             res.redirect('/list_subjects')
  //         }
  //         else{

  //         }
  //     })
  // }

  // app.post('/delSubject/:id', subject.category_delete_post)
  // app.post('/delSubject/:id', controller.delSubject)
  //////////////////////subject portion end///////////

  //////////////////////////final Question route portion start//////////////
  app.get("/add_Question", (req, res) => {
    res.render("question");
  });
  app.get("/addques", controller.process_create_get);
  app.post("/add_Question", Controller.question_create_post);
  app.get("/showlist", controller.question_list);
  app.get("/update_Question/:id", controller.updatequestion);
  app.get("/delete_Question/:id", controller.deletequestion);

  //////////////////////End of Question portion////////////////////////
  ///////////////////////////////////////Team Section/////////////////////////////
  app.get("/createteam", (req, res) => {
    res.render("Team_Add.hbs");
  });
  app.post("/addteam", Team.Team_create_post)
  app.get("/teamlist",Team.Team_list )
  app.get("/delete_team/:id", Team.teamdelete);

  ///////////////////////////////////Team Section End//////////////////////////////////

  //////////////////EventHead Section////////////////////
  app.get("/evenhead", (req, res) => {
    res.render("Event_head.hbs");
  });
  app.post("/register",eventheadregister )
  app.get('/eventheadlists', eventhead_list)

  //////////////////End//////////////////////

  // app.post('/add_Q', async (req, res) => {
  //     const question = req.body.question
  //     const option1 = req.body.option1
  //     const option2 = req.body.option2
  //     const option3 = req.body.option3
  //     const option4 = req.body.option4
  //     const ans = req.body.ans
  //     const create = new Subjectvs({
  //         question,
  //         option1,
  //         option2,
  //         option3,
  //         option4,
  //         ans
  //     })
  //      await create.save(err=> {
  //         if(err) {
  //             console.log(err)
  //         }
  //         else {
  //             res.json("successfully")
  //         }
  //     })
  // })
  //     // const Employee = mongoose.model('empModel');
  // app.get('/', (req, res) => {
  //     res.render("employee/addupdate", {
  //         viewTitle: "Insert Employee"
  //     });
  // });
  // app.post('/employee', (req, res) => {
  //     // if (req.body._id == '')
  //         insertRecord(req, res);
  //     // else
  //     //     updateRecord(req, res);
  // });
  // // app.get('/showlist',controller.category_list)
  // function insertRecord(req, res)
  // {
  //     var employee = new empModel;
  //     employee.full_name = req.body.full_name;
  //     employee.email = req.body.email;
  //     employee.mobile = req.body.mobile;
  //     employee.address = req.body.address;
  //     employee.salary = req.body.salary;
  //     employee.save((err, doc) => {
  //         res.render('subject_Add.hbs')
  //         // if (!err)
  //         //     res.redirect('employee/list');
  //         // else {
  //         //     if (err.name == 'ValidationError') {
  //         //         handleValidationError(err, req.body);
  //         //         res.render("employee/addupdate", {
  //         //             viewTitle: "Create Employee",
  //         //             employee: req.body
  //         //         });
  //         //     }
  //         //     else
  //         //         console.log('Error during record insertion : ' + err);
  //         // }
  //     });
  // }
  // //  Subject Endpoint route

  // // app.post('/Subject', controller.SubjectAdd)
  // app.post("/addSubject", controller.AddSubjects)
  // //////End Subject/////////////////////////////
  // app.get('/user/all',Controller.Read);
  // app.get('/questions', controller.getAllquestions)
  // app.get('/question/:id', controller.getOnequestion)
  // app.put('/question/:id', controller.updateQuestion)
  // // app.put('/user/all/:todo_id',Controller.Update);
  // app.post('/create_Question',Controller.create_Question);
  // app.get('/adduser',Controller.Read);
  // // app.get('/create',Controller.Create )
  // app.delete('/delquestion/:id',Controller.delQuestion);
  // // app.get('/',function(req,res){
  // // console.log("Este si carga");
  // // // res.sendFile('./public/index.html');
  // // });
  // app.post( '/add' , (req, res, next) => {
  //     /////////////////create custome function
  //         insertRecord(req, res)
  //         // const user = new Subject({
  //         //     _id: mongoose.Types.ObjectId(),
  //         //     name: req.body.name,
  //         //     // address:req.body.address,
  //         //     // salary: req.body.salary
  //         // });
  //         // user.save()
  //         // .then(result => {
  //         //     res.status(200).json({
  //         //         docs:[user]
  //         //     });
  //         // })
  //         // .catch(err => {
  //         //     console.log(err);
  //         // });
  //     });
  //     function insertRecord(req, res)
  //     {
  //         var subject = new Subjectvs();
  //         subject.username = req.body.username
  //         subject.save((err, doc) => {
  //             //if no error there
  //             if(!err){
  //                 return res.status(201).json(Subjectvs)
  //                 // res.redirect('subjectmain')
  //             }
  //             else{
  //                 //if error there
  //                 console.log("an error there is during addmig subject"+err)
  //             }
  //         })
  //     }
  ////////////////////////////////Testing End POint??????????????????
  // app.get('/liste' , async (req, res) => {
  //     await Subject.find((err, docs) => {
  //         if(!err){
  //             res.render('subjectmain',{
  //                 list:docs
  //             })
  //         }
  //     })
  // })
  // app.get('/lists', async(req, res, next) =>{
  //     // let data =  Subject.data
  //     let Studatas = await Subjectvs.find({}).exec((err, subjdata) => {
  //         if(subjdata){
  //             res.render('subjectmain',{title:"Subject List", data:subjdata})
  //             console.log(subjdata)
  //         }
  //     })
  // })
  // app.get('/list', (req, res) => {
  //     Employee.find((err, docs) => {
  //         if (!err) {
  //             res.render("employee/list", {
  //                 emplist: docs
  //             });
  //         }
  //         else {
  //             console.log('Error in retrieving emp list :' + err);
  //         }
  //     });
  // });
  // app.get("/list", function (req, res) {
  //     Subject.find({}, function (err,allDetails) {
  //         if (err) {
  //             console.log(err);
  //         } else {
  //             res.render("subjectmain",{details:allDetails})
  //             //res.status(201).json(allDetails)
  //         }
  //     })
  // });
  // app.get('/lists', (req, res , docs) => {
  //     Subjectvs.find().lean().exec(function (err, docs) {
  //         if (!err) {
  //             res.render("subjectmain", {
  //                 title:"titlename",
  //                 docs: docs
  //             });
  //             console.log(docs)
  //         }
  //         else {
  //             console.log('Error in retrieving emp list :' + err);
  //         }
  //     });
  // });


  


  app.get("/test1", function (req, res) {
    res.render("test");
  });
};
