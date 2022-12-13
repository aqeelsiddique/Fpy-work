const controller = require('./controller');
var Controller=require('./controller');
const Subject = require("./user")


module.exports=function(app){
//  Subject Endpoint route
app.get('/AddSub', (req, res) => {
    res.render("subject_Add.hbs", {
        subjecttitle:"Add a Subject"
    })
})
app.post('/Subject', controller.SubjectAdd)


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
        var subject = new Subject();
        subject.username = req.body
        subject.save((err, doc) => {
            //if no error there 
            if(!err){
                return res.status(201).json(Subject)

                // res.redirect('home')
    
            }
            else{
                //if error there
                console.log("an error there is during addmig subject"+err)
            }
        })
    
    }
////////////////////////////////Testing End POint??????????????????

app.get('/', (req, res) => {
    res.render('home')
 })
 }


 