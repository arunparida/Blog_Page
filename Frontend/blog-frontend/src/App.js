import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/blog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', image: null });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFormChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append('title', formData.title);
      formDataForUpload.append('description', formData.description);
      formDataForUpload.append('image', formData.image);

      await axios.post(`${API_URL}/create`, formDataForUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchData();
      setFormData({ title: '', description: '', image: null });
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <div className="App">
      <h1>Blog Posts</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleFormChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleFormChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleFormChange} accept="image/*" required />
        </div>
        <div>
          <button type="submit">Post</button>
        </div>
      </form>
      <ul>
        {blogs.map(blog => (
          <li key={blog._id}>
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <img src={`http://localhost:3000/uploads/${blog.image}`} alt={blog.title} style={{ maxWidth: '300px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
