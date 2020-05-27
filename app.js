const queryString = require('querystring');

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');

  const url = req.url;
  req.path = url.split('?')[0];

  req.query = queryString.parse(url.split('?')[0]);

  const blogData = handleBlogRouter(req, res);
  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }

  const userData = handleUserRouter(req, res);
  if (userData) {
    res.end(JSON.stringify(userData));
    return;
  }

  res.writeHead(404, { 'Content-type': 'text/plan' });
  res.write('404 not found');
};

module.exports = serverHandle;
