const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { set } = require('../db/redis.js');

const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    const result = login(username, password);

    return result.then((data) => {
      if (data.username) {
        set(req.sessionId, {
          username: data.username,
          realname: data.realname,
        });

        return new SuccessModel();
      }
      return new ErrorModel('Error when login');
    });
  }
};

module.exports = handleUserRouter;
