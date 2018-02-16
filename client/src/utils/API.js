import axios from "axios";

export default {
  getArticles: function (q, start, end) {
    return axios.get(`/api/search/${q}/${start}/${end}`);
  },
  saveArticle: function(articleData) {
    return axios.post("/api/article/save", articleData);
  },
  savedArticles: function () {
    return axios.get("/api/articles");
  },
  deleteArticle: function(id) {
    return axios.delete(`/api/article/delete/${id}`);
  }
};
