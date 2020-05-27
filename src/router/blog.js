const handleBlogRouter = (req, res) => {
  const method = req.method;

  if (method === 'GET' && req.path === '/api/blog/list') {
    return {
      msg: 'This is the API of getting blog list',
    };
  }

  if (method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: 'This is the API of getting blog detail',
    };
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: 'This is the API of creating a blog',
    };
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: 'This is the API of updating a blog',
    };
  }

  if (method === 'POST' && req.path === '/api/blog/delete') {
    return {
      msg: 'This is the API of deleting a blog',
    };
  }
};

module.exports = handleBlogRouter;
