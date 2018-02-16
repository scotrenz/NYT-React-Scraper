const path = require("path");
const router = require("express").Router();
const db = require("../models");
const axios = require("axios");

router.get("/api/search/:q?/:start?/:end?", function (req, res) {
  let results = [];
  const url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  const key = "9ac09b1bd6cb4bdfa18006a33cf1384f";
  axios.get(url, {
    params: {
      'api-key': key,
      'q': req.params.q,
      'begin_date': req.params.start,
      'end_date': req.params.end
    }
  })
    .then(function (response) {
      //getting all the results from api call
      // const array = response.data.response.docs;
      // array.forEach(article => {
      //   results.push({
      //     title: article.snippet,
      //     date: article.pub_date,
      //     url: article.web_url
      //   })
      // })
      //getting only 5 results from api call
      for(let i = 0; i < 5; i++) {
        results.push({
          title: response.data.response.docs[i].snippet,
          date: response.data.response.docs[i].pub_date,
          url: response.data.response.docs[i].web_url
        })
      }
      res.json(results)
    })
});

router.post("/api/article/save", function (req, res) {
  db.Article
    .create(req.body)
    .then(dbModel => res.json(dbModel))
});

router.get("/api/articles", function (req, res) {
  db.Article
    .find({})
    .sort({date: -1})
    .then(allArticles => res.json(allArticles))
});

router.delete("/api/article/delete/:id", function (req, res) {
  db.Article 
    .findById({_id: req.params.id})
    .then(savedArticle => savedArticle.remove())
    .then(allSavedArticles => res.json(allSavedArticles))
});

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
