
var morgan=require('morgan')
var bodyParser=require('body-parser');
var methodOverride=require('method-override');
// mongoose.connect('mongodb://localhost/local');
var mongoose=require('mongoose');



var express=require('express');
var app=express();
const hbs = require('express-handlebars');




// app.engine('hbs', hbs());
app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');


const db = process.env.MONGODB_URI || 'mongodb+srv://Aqeel:aqeel12345@cluster0.uhg7y9z.mongodb.net/visiosparkwebsite?retryWrites=true&w=majority';

// Connect to MongoDB instance
mongoose
  .connect(db, {
   useNewUrlParser: true, 

   useUnifiedTopology: true 
  })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.log('MongoDB connection error: ' + err));
// app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//Endpoints
require('./route')(app); 
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port: ${port}`));

