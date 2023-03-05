
var morgan=require('morgan')
var bodyParser=require('body-parser');
var methodOverride=require('method-override');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')
// mongoose.connect('mongodb://localhost/local');
var mongoose=require('mongoose');
var express=require('express');
var app=express();
const ejs = require('ejs');

const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');


const path = require('path')
app.use(bodyParser.urlencoded({extended:true}))
///////////////Template engine
var exphbs = require('express-handlebars');

app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main" , layoutDir: __dirname + '/views/partials'
,partialDir:__dirname+'/views/partials/' ,
helpers: {
  isScheduled: a => {
    if (a === "Scheduled") {
      return true;
    }
  },
  isStarted: m => {
    if (m === "Started") {
      return true;
    }
  },
  isSelected: (firstId, secondId) => {
    if (firstId.toString() == secondId) {
      return " selected";
    } else {
      return "";
    }
  },
},
runtimeOptions: {
  allowProtoMethodsByDefault: true,
  allowProtoPropertiesByDefault: true,
},
}));
// app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "register"}));
app.set("view engine", "ejs");

app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, './public')));

////database connection////
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
const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Server started on port: ${port}`));
require('./route/route')(app); 

