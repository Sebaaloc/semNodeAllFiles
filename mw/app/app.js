const express = require('express');
const morgan = require('morgan');
const errorMW = require('./middlewares/error');
const logger = require('./logger/logger');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')


const app = express();

dotenv.config();

const indexRoutes = require('./routes/index')

//settings
app.set('port', process.env.PORT);
console.log(process.env.PORT)

//middlewares
morgan.token('req-params', req => req.params);
app.use(
    morgan(
        '[:date[clf]] :remote-addr - Request ":method :url" with params: :req-params. Response status: :status.'
    )
);

app.use(cors())
app.use(express.urlencoded({ extended: false }))

//To support Json params
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ 
  extended: true
})); 

// routes
app.use('/', indexRoutes);
app.use(errorMW.handle);

//starting the server
app.listen(app.get('port'), () => {
    logger.info(`server on port ${app.get('port')}`);
});

module.exports = app;