const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

const server = require("../../app");

chai.use(chaiHttp);
let token, movieId;
describe("/api/movies tests", () => {
  before(done => {
    chai
      .request(server)
      .post("/authenticate")
      .send({ username: "eyupbaycol", password: "eyupeyup" })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  describe("/GET Movies", () => {
    it("it should Get all the movies", done => {
      chai
        .request(server)
        .get("/api/movies")
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST Movies", () => {
    const movie = {
      title: "deneme2",
      director_id: "5e3582155064321f48c890cf",
      category: "Korku",
      country: "Türkiye",
      year: 1992,
      imdb_score: 8
    };
    it("İt shoul be add a movie", done => {
      chai
        .request(server)
        .post("/api/movies")
        .send(movie)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("director_id");
          res.body.should.have.property("category");
          res.body.should.have.property("country");
          res.body.should.have.property("year");
          res.body.should.have.property("imdb_score");
          movieId = res.body._id;
          done();
        });
    });
  });
  describe("/get movie by id ", () => {
    it("should be get movie by id", done => {
      chai
        .request(server)
        .get("/api/movies/" + movieId)
        .set("x-access-token", "sdsadasdsdsdas")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("director_id");
          res.body.should.have.property("category");
          res.body.should.have.property("country");
          res.body.should.have.property("year");
          res.body.should.have.property("imdb_score");
          res.body.should.have.property("_id").eql(movieId);
          done();
        });
    });
  });
  // describe("/PUT/:director_id", () => {
  //   const movie = {
  //     title: "update",
  //     director_id: "5e3582155064321f48c890cm",
  //     category: "Koku",
  //     country: "Tükiye",
  //     year: 1991,
  //     imdb_score: 1
  //   };
  //   it("it shoul be update a movie given by id", done => {
  //     chai
  //       .request(server)
  //       .put("/api/movies/" + movieId)
  //       .set("x-access-token", token)
  //       .send(movie)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");
  //         res.body.should.have.property("title").eql(movie.title);
  //         res.body.should.have.property("director_id").eql(movie.director_id);
  //         res.body.should.have.property("category").eql(movie.category);
  //         res.body.should.have.property("country").eql(movie.country);
  //         res.body.should.have.property("year").eql(movie.year);
  //         res.body.should.have.property("imdb_score").eql(movie.imdb_score);
  //         done();
  //       });
  //   });
  // });
});
