const Blog = require('../models/blog');


//find all the blogs from Blogs schema from mongodb and it will return an array of all the data,
// since we have the index.ejs to dynamically cycle through all the data instances from schema
//therefore we can render that page and pass the array(result) from find(moongoose) to blogs variable 
//which is passed to index.ejs to dynamically render all the data.
//sort() can sort through given index, moongose already gives createdAt and -1 is descending.
const blog_index = (req,res) => {
    Blog.find().sort({createdAT: -1}).then((result) => {
        res.render('./blogs/index', { title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    });
}


const blog_details = (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
      res.render('./blogs/details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_create_get = (req,res) =>{
    res.render('./blogs/create', { title: 'Create a new blog' });
}

const blog_create_post = (req,res) =>{
      // console.log(req.body);
      const blog = new Blog(req.body);
  
      blog.save()
        .then(result => {
          res.redirect('/blogs');
        })
        .catch(err => {
          console.log(err);
        });
}

const blog_delete = (req,res) =>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}
module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}