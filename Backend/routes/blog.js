const express = require('express');
const router = express.Router();
const multer = require('multer');
const blogController = require('../controllers/blog');

//multer(middleware)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Multer will store uploaded images in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create a new blog post
router.post('/create', upload.single('image'), blogController.createBlog);

// Get all blog posts
router.get('/all', blogController.getAllBlogs);

// Get a single blog post by slug
router.get('/:slug', blogController.getBlogBySlug);

// Update a blog post by slug
router.put('/:slug', upload.single('image'), blogController.updateBlogBySlug);

// Delete a blog post by slug
router.delete('/:slug', blogController.deleteBlog);

module.exports = router;
