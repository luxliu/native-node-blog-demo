const xss = require('xss');

const { exec, escape } = require('../db/mysql');

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author=${escape(author)} `;
  }
  if (keyword) {
    sql += `and title like ${escape(`%${keyword}%`)} `;
  }
  sql += `order by createtime desc`;

  console.log(sql);
  return exec(sql);
};

const getDetail = (id) => {
  const sql = `select * from blogs where id=${id}`;
  return exec(sql).then((rows) => rows[0]);
};

const newBlog = (blogData = {}) => {
  const { title, content, author } = blogData;
  const createtime = Date.now();
  const sql = `insert blogs (title, content, createtime, author) values (${escape(
    xss(title)
  )}, ${escape(xss(content))}, ${createtime}', ${escape(author)}')`;

  return exec(sql).then((insertData) => {
    return {
      id: insertData.insertId,
    };
  });
};

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData;
  const sql = `update blogs set title=${escape(xss(title))}, content=${escape(
    xss(content)
  )} where id=${id}`;

  return exec(sql).then((updateData) => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}'`;

  return exec(sql).then((deleteData) => {
    if (deleteData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

module.exports = { getList, getDetail, newBlog, updateBlog, deleteBlog };
