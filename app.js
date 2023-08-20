const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes')
// express app
const app = express();

//db connect stream to mongo

const dbURI = "mongodb+srv://cool:test123@cluster0.giaevv3.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));


// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//middleware and statics

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
//routes
app.get('/', (req, res) => {
    //you can do seperate homepage, but we are redirecting it to blogs page where all the blogs are
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// these are blog routes

app.use('/blogs', blogRoutes);

//we  '/blogs' to forward/redirect when the blogs is the first part of get request
// so we need to remove it from the routes in blogRoutes.js

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});