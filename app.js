const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');

  res.end(JSON.stringify());
};

module.exports = serverHandle;
