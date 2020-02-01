const express = require("express");
const router = express.Router();

//models

const Director = require("../models/Director");

//add director endpoint
router.post("/", (req, res, next) => {
  const director = new Director(req.body);
  var promise = director.save();

  promise
    .then(data => {
      if (!data) next({ errormesage: "Uppps Error" });

      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

// get director and director's movies

router.get("/", (req, res, next) => {
  const promise = Director.aggregate([
    {
      $lookup: {
        from: "movies",
        localField: "_id",
        foreignField: "director_id",
        as: "movies"
      }
    },
    {
      $unwind: {
        path: "$movies",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
          surname: "$surname",
          bio: "$bio"
        },
        movies: {
          $push: "$movies"
        }
      }
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        surname: "$_id.surname",
        bio: "$_id.bio",
        movies: "$movies"
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

//list of all directors
router.get("/", (req, res, next) => {
  var promise = Director.find({});
  promise
    .then(data => {
      if (!data) next({ errormesage: "We not found any data" });

      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
