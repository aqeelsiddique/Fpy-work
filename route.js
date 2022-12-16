const controller = require('./controller');
var Controller=require('./controller');
const Subjectvs = require("./user")
const mongoose = require('mongoose');
const empModel = require('./user')



module.exports=function(app){

    //////////////////////////test 0001

    // const Employee = mongoose.model('empModel');

app.get('/', (req, res) => {
    res.render("employee/addupdate", {
        viewTitle: "Insert Employee"
    });
});

app.post('/employee', (req, res) => {
    // if (req.body._id == '')
        insertRecord(req, res);
    // else
    //     updateRecord(req, res);
});

function insertRecord(req, res) 
{
    var employee = new empModel();
    employee.full_name = req.body.full_name;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.address = req.body.address;
    employee.salary = req.body.salary;
    employee.save((err, doc) => {
        console.log(doc)

        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addupdate", {
                    viewTitle: "Create Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}






//  Subject Endpoint route
app.get('/AddSub', (req, res) => {
    res.render("subject_Add.hbs", {
        subjecttitle:"Add a Subject"
    })
})
// app.post('/Subject', controller.SubjectAdd)

app.post("/addSubject", controller.AddSubjects)
app.delete('/delSubject/:id', controller.delSubject)

//////End Subject

app.get('/user/all',Controller.Read);
app.get('/questions', controller.getAllquestions)
app.get('/question/:id', controller.getOnequestion)
app.put('/question/:id', controller.updateQuestion)

// app.put('/user/all/:todo_id',Controller.Update);

app.post('/create',Controller.create);
app.get('/adduser',Controller.Read);


// app.get('/create',Controller.Create )
app.delete('/delquestion/:id',Controller.delQuestion);


// app.get('/',function(req,res){
// console.log("Este si carga");
// // res.sendFile('./public/index.html');
// });

app.post( '/add' , (req, res, next) => {
    /////////////////create custome function
        insertRecord(req, res)
     
        // const user = new Subject({
        //     _id: mongoose.Types.ObjectId(),
        //     name: req.body.name,
        //     // address:req.body.address,
        //     // salary: req.body.salary
        // });
     
        // user.save()
        // .then(result => {
        //     res.status(200).json({
        //         docs:[user]
        //     });
        // })
        // .catch(err => {
        //     console.log(err);
        // });
    });
    function insertRecord(req, res)
    {
        var subject = new Subjectvs();
        subject.username = req.body.username
        subject.save((err, doc) => {
            //if no error there 
            if(!err){
                return res.status(201).json(Subjectvs)

                // res.redirect('home')
    
            }
            else{
                //if error there
                console.log("an error there is during addmig subject"+err)
            }
        })
    
    }
////////////////////////////////Testing End POint??????????????????
app.get('/liste' , async (req, res) => {
    await Subject.find((err, docs) => {
        if(!err){
            res.render('home',{
                list:docs
            })
        }
    })
})
// app.get('/lists', async(req, res, next) =>{
//     // let data =  Subject.data
//     let Studatas = await Subjectvs.find({}).exec((err, subjdata) => {
//         if(subjdata){
//             res.render('home',{title:"Subject List", data:subjdata})
//             console.log(subjdata)
//         }
//     })


    
// })
app.get('/lists', (req, res) => {
    Subjectvs.find((err, docs) => {
        if (!err) {
            res.render("home", {
                emplist: docs
            });
            console.log(docs)
        }
        else {
            console.log('Error in retrieving emp list :' + err);
        }
    });
});

app.get("/list", function (req, res) {   
    Subject.find({}, function (err,allDetails) {
        if (err) {
            console.log(err);
        } else {
            res.render("home",{details:allDetails})
            //res.status(201).json(allDetails)
        }
    })
    

});

app.get("/dashboard" , function(req,res) {
    res.render("dashboard")
})


 }


 