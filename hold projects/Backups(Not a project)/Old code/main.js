import express from "express";
const app = express();
import mongoose from "mongoose";
const port = 3000;
app.use(express.static("templates"));

app.set("view engine", "ejs");
// let conn = mongoose.connection("mongodb://localhost:27017/")
app
  .get("/", (req, res) => {
    res.render(
      // "D:\\Swamiraj\\Programing\\Projects\\QuizHut\\templates\\Home\\Home.ejs"
      "D:\\Swamiraj\\Programing\\Projects\\Website\\QuizHut\\templates\\Home\\Home.ejs"
    );
  })
  .get("/Join", (req, res) => {
    res.render(
      "D:\\Swamiraj\\Programing\\Projects\\Website\\QuizHut\\templates\\Join\\Join.ejs"
    );
  })
  .get("/Create", (req, res) => {
    function getRandomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }
    let gamecode = getRandomNumber(0,100000)

    res.render(
      "D:\\Swamiraj\\Programing\\Projects\\Website\\QuizHut\\templates\\Create\\Create.ejs",
      { roomcode: gamecode }
    );
  })
  .get("/:gamecode/:playername/:score/:rank/leaderboard", (req, res) => {
    res.render(
      "D:\\Swamiraj\\Programing\\Projects\\Website\\QuizHut\\templates\\Leaderboard\\LeaderBoard.ejs",
      {
        username: req.params.playername,
        rank: req.params.rank,
        score: parseInt(req.params.score),
      }
    );
    console.log(typeof parseInt(req.params.score));
  })
  .get("/:gamecode/quiz/", (req, res) => {
    res.render(
      "D:\\Swamiraj\\Programing\\Projects\\Website\\QuizHut\\templates\\Quizpage\\Quizpage.ejs",
      {question: "sadjagsdhghj", opt1:"snbdsnbsbn",opt2:"dsfhg",opt3:"snbdsnbsbn", opt4:"snbdsnbsbn" }
    );
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
