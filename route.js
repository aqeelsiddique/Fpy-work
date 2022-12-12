const controller = require('./controller');
var Controller=require('./controller');


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

////////////////////////////////Testing End POint??????????????????

app.get('/', (req, res) => {
    res.render('home')
 })
 }


 