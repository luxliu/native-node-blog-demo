const loginCheck = ({ username, password }) => {
  if (username === 'lux' && password === '123') {
    return true;
  }
};

module.exports = { loginCheck };
