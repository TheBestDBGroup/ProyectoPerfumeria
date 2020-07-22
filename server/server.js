const express = require('express');
const bodyParser = require('body-parser');
const pg=require('pg');
const cors = require('cors');
const morgan = require('morgan');
const path = require ('path');
const app = express();
const helmet = require('helmet'); 


const publicPath = path.join(__dirname, '..','frontend', 'public');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(publicPath)));
app.use(morgan('dev'));
app.use(helmet());


    
app.set('PORT', process.env.PORT || 5000);

app.use('/',require('./routes'))


app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

//Error 404
app.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(app.get('PORT'), () => 
console.log('Listening at ' + app.get('PORT')))