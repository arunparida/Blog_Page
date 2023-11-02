const Blog = require('../models/blog');
const slugify = require("slugify");

//Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image =   req.file ? `http://localhost:3000/uploads/${req.file.filename}`: '' // Multer saves the uploaded file as 'filename'

    const slug = slugify(title, { lower: true }); // Generate slug from the title
    
    const blog = new Blog({ title,slug, image, description });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


//Get all blog posts
exports.getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


    // Get a single blog post by ID
    exports.getBlogBySlug = async (req, res) => {
    try {
      const blog = await Blog.findOne({ slug: req.params.slug });
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.status(200).json(blog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Update a blog post by Slug
  exports.updateBlogBySlug = async (req, res) => {
    try {
      const { title, description } = req.body;
      const image = req.file.filename;
  
      const updatedblog = await Blog.findOneAndUpdate(
        { slug:req.params.slug},    //find the blog post by slug
        { title, image, description },  //updated data
        { new: true });     //Return the updated document
      if (!updatedblog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.status(200).json(updatedblog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Delete a blog post by ID
  exports.deleteBlog = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

