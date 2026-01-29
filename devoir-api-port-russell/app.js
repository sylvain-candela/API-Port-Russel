const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const indexRouter = require('./routes/index');

const mongodb = require('./db/mongo');
const userRouter = require('./routes/users');
const catwayRouter = require('./routes/catways');
const reservationRouter = require('./routes/reservations');

const path = require('path');
const app = express();

mongodb.initClientDbConnection();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.post('/test-direct', (req, res) => {
  res.status(200).json({ message: "Le serveur est bien vivant !" });
});

app.use(cors({
  exposedHeaders: ['Authorization'],
  origin: '*'
}));
app.use(logger('dev'));

app.use('/users', userRouter);
app.use('/catways', catwayRouter);
app.use('/reservations', reservationRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handler
app.use(function(req, res, next) {
  res.status(404).json ({name:'API', version: '1.0', status:404, message: 'not_found'});
});


module.exports = app;
