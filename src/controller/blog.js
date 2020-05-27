const getList = (author, keyword) => [
  {
    id: 1,
    title: 'title A',
    content: 'content A',
    createTime: 1590550645595,
    author: 'Lux',
  },
  {
    id: 2,
    title: 'title B',
    content: 'content B',
    createTime: 1590550673078,
    author: 'Liu',
  },
];

const getDetail = (id) => ({
  id: 1,
  title: 'title A',
  content: 'content A',
  createTime: 1590550645595,
  author: 'Lux',
});

const newBlog = (blogData = {}) => ({
  id: 3,
});

const updateBlog = (id, blogData = {}) => {
  return true;
};

const deleteBlog = (id) => {
  return true;
};

module.exports = { getList, getDetail, newBlog, updateBlog, deleteBlog };
