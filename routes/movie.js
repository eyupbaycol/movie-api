var express = require("express");
var router = express.Router();

//Models

const Movie = require("../models/Movie");

router.get("/top10", function(req, res) {
  const promise = Movie.find({})
    .limit(10)
    .sort({ imdb_score: -1 });
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/:movies_id", (req, res, next) => {
  // res.send(req.params);
  var promise = Movie.findById(req.params.movies_id);
  promise
    .then(data => {
      if (!data) next({ message: "The movie was not found." });
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/", function(req, res, next) {
  // const promise = Movie.find({});
  const promise = Movie.aggregate([
    {
      $lookup: {
        from: "directors",
        localField: "director_id",
        foreignField: "_id",
        as: "directors"
      }
    },
    {
      $unwind: {
        path: "$directors",
        preserveNullAndEmptyArrays: true
      }
    }
  ]);
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

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
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
});

router.put("/:movies_id", (req, res, next) => {
  // res.send(req.params);
  var promise = Movie.findByIdAndUpdate(req.params.movies_id, req.body, {
    new: true
  });
  promise
    .then(data => {
      if (!data) next({ message: "The movie was not found." });

      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
router.delete("/:movies_id", (req, res, next) => {
  // res.send(req.params);
  var promise = Movie.findByIdAndRemove(req.params.movies_id);
  promise
    .then(data => {
      if (!data) next({ message: "The movie was not found." });
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//Betwen
router.get("/between/:start_year/:end_year", (req, res, next) => {
  const { start_year, end_year } = req.params;
  const promise = Movie.find({
    year: { $gte: parseInt(start_year), $lte: parseInt(end_year) }
  });
  promise
    .then(data => {
      if (!data) next({ message: "The movie was not found." });

      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
