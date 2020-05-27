const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: 'This is the API of login a user',
    };
  }
};

module.exports = handleUserRouter;
