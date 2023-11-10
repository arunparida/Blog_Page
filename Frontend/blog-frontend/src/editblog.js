import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditBlog({ match }) {
    const navigate = useNavigate();
    const { blog_id } = useParams()
    const id = blog_id;
    console.log("blog_id",blog_id)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchBlogDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/blog/${id}`);
        const { title, description } = response.data;
        setTitle(title);
        setDescription(description);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBlogDetails();
  }, [ id ]);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:3000/blog/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Redirect to the blog details page or show a success message
      navigate('/');     
    } catch (error) {
      // Handle error (show error message to the user)
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
