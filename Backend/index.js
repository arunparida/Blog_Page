const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blog');
const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use("/uploads", express.static("uploads"));     //for image uploads

mongoose.connect('mongodb://0.0.0.0:27017/wovnn-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use('/blog', blogRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
