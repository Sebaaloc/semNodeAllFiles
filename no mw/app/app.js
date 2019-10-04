const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')


const app = express();

dotenv.config();

const indexRoutes = require('./routes/index')

//settings
app.set('port', process.env.PORT);
console.log(process.env.PORT)

app.use(cors())
app.use(express.urlencoded({ extended: false }))

//To support Json params
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ 
  extended: true
})); 

// routes
app.use('/', indexRoutes);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});

module.exports = app;