import React from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog, onDelete }) => {
  const handleDelete = () => {
    // Call the onDelete function
    onDelete(blog._id);
  };

  return (
    <div className="card" style={{ width: '18rem', margin: '20px' }}>
      <img className="card-img-top" src={`http://localhost:3000/uploads/${blog.image}`} alt={blog.title} />
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">{blog.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/edit/${blog._id}`} className='btn btn-primary'>Edit</Link>
          <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
