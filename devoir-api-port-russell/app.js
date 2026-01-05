const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')


const indexRouter = require('./routes/index');
const fileRouter = require('./routes/files')
const mongodb = require('./db/mongo');
const userRouter = require('./routes/users')

const path = require('path');

mongodb.initClientDbConnection();

const app = express();

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/files', fileRouter);
app.use('/users', userRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'assets')));

// error handler
app.use(function(req, res, next) {
  res.status(404).json ({name:'API', version: '1.0', status:404, message: 'not_found'});
});


module.exports = app;
