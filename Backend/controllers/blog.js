const Blog = require('../models/blog');
const slugify = require("slugify");

//Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image =   req.file.filename;  // Multer saves the uploaded file as 'filename'

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
    exports.getBlogByID = async (req, res) => {
    try {
      const blog = await Blog.findOne({_id:req.params.id});
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.status(200).json(blog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Update a blog post by ID
  exports.updateBlog = async (req, res) => {
    try {
      const { id } = req.params; // Assuming you get the ID from the request parameters
      const { title, description } = req.body; // Assuming you get the updated data from the request body
  
      // Find the blog post by its ID and update it
      const updatedBlog = await Blog.findOneAndUpdate(
        { _id: id }, // Query: find by ID
        { title, description }, // Updated data
        { new: true } // Options: return the updated document
      );
  
      // Check if the blog post was found and updated
      if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
  
      // Send the updated blog post as a response
      res.json(updatedBlog);
    } catch (error) {
      // Handle any errors that occurred during the update process
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
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
