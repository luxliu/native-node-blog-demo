const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'POST' && req.path === '/api/user/login') {
    const result = loginCheck(req.body);

    return result.then((data) => {
      if (data.username) {
        return new SuccessModel();
      }
      return new ErrorModel('Error when login');
    });
  }
};

module.exports = handleUserRouter;
