const queryString = require('querystring');

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const { set, get } = require('./src/db/redis');
const { access } = require('./src/utils/log');

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }

    let postData = '';
    req.on('data', (chunk) => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });

  return promise;
};

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

const serverHandle = (req, res) => {
  access(
    `${req.method} -- ${req.url} -- ${
      req.headers['user-agent']
    } -- ${Date.now()}`
  );

  res.setHeader('Content-type', 'application/json');

  const url = req.url;
  req.path = url.split('?')[0];

  //attach query
  req.query = queryString.parse(url.split('?')[1]);

  //attach cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach((item) => {
    if (!item) {
      return;
    }
    const [key, val] = item.split('=');
    req.cookie[key.trim()] = val.trim();
  });

  // attach session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    console.log('userId: ', userId);
  }

  req.sessionId = userId;
  get(req.sessionId)
    .then((sessionData) => {
      if (!sessionData) {
        set(req.sessionId, {});
        req.session = {};
      } else {
        req.session = sessionData;
      }

      return getPostData(req);
    })
    .then((postData) => {
      req.body = postData;

      const blogResult = handleBlogRouter(req, res);
      if (blogResult) {
        blogResult.then((blogData) => {
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
            );
          }
          return res.end(JSON.stringify(blogData));
        });

        return;
      }

      const userResult = handleUserRouter(req, res);
      if (userResult) {
        userResult.then((userData) => {
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
            );
          }
          return res.end(JSON.stringify(userData));
        });

        return;
      }

      res.writeHead(404, { 'Content-type': 'text/plan' });
      res.write('404 not found');
      res.end();
    });
};

module.exports = serverHandle;
