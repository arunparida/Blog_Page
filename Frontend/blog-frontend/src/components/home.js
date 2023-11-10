import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Blog from './card';

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3000/blog/all');
      setBlogs(response.data);
    }
    fetchData();
  }, []);


  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://localhost:3000/blog/${id}`);
      //Refresh the blog after deletion
      const response = await axios.get('http://localhost:3000/blog/all');
      setBlogs(response.data);
    } catch(error){
      console.error(error);
    }
  };


  return (
    <div className="container">
      <h1>Blog Posts</h1>
      <Link to="/create" className='btn btn-primary mb-4'>Create</Link>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4" key={blog._id}>
            <Blog blog={blog} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
