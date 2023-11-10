import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import CreateBlog from './components/createblog';
import EditBlog from './editblog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBlog />} />
        {/* <Route path='/edit/' element={<EditBlog />} /> */}
        <Route path='/edit/:blog_id' element={<EditBlog />} />

        
      </Routes>
    </Router>
  );
}

export default App;

