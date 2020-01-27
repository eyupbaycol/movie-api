var express = require("express");
var router = express.Router();

//Models

const Movie = require("../models/Movie");

router.post("/", function(req, res, next) {
  // const { title, imdb_score, category, country, year } = req.body;

  // const movie = new Movie({
  //   title: title,
  //   imdb_score: imdb_score,
  //   category: category,
  //   country: country,
  //   year: year
  // });
  //// Bu birinci yol şimdi isie aynı işi yapan kısa yolu

  const movie = new Movie(req.body);

  // movie.save((err, data) => {
  //   if (err) res.json(err);

  //   res.json(data);
  // });
  const promise = movie.save();
  promise
    .then(data => {
      res.json({ status: 1 });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
