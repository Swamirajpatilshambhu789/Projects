// // Api url: https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple
// let mainholder =document.querySelector(".qanda")
// let questionbox = document.querySelector(".ques");
// let option1 = document.querySelector(".opt1");
// let option2 = document.querySelector(".opt2");
// let option3 = document.querySelector(".opt3");
// let option4 = document.querySelector(".opt4");
// let points = document.querySelector(".points");

// async function fetcher() {
//   const url =
//     "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();

//     // Transform the data
//     const formattedQuestions = json.results.map((item) => {
//       const options = [...item.incorrect_answers, item.correct_answer];
//       return {
//         question: item.question,
//         options: shuffleArray(options), // Shuffle options for randomness
//         correctOption: item.correct_answer,
//       };
//     });

//     return formattedQuestions;
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// function shuffleArray(array) {
//   return array.sort(() => Math.random() - 0.5);
// }

// // Usage
// async function main() {
//   const questions = await fetcher();
//   if (questions) {
//     // alert(questions[0].correctOption[0``])
//     questionbox.innerHTML = questions[0].question;
//     option1.innerHTML = questions[0].options[0];
//     option2.innerHTML = questions[0].options[1];
//     option3.innerHTML = questions[0].options[2];
//     option4.innerHTML = questions[0].options[3];
//     correctopt = questions[0].correctOption;
//     if (correctopt == option1.innerHTML) {
//       option1.addEventListener("click", () => {
//         mainholder.innerHTML == `<div class="anschecker">Correct Answer</div>
//            <button class="nextquestion">Next</button>`
//            console.log("correct")
//         // console.log(questions[0].options[1])
//       });}
//     if (correctopt == option2.innerHTML) {
//         option2.addEventListener("click", () => {
//           mainholder.innerHTML == `<div class="anschecker">Correct Answer</div>
//            <button class="nextquestion">Next</button>`
//            console.log("correct")
//           // console.log(questions[0].options[1])
//     });}
//     if (correctopt == option3.innerHTML) {
//           option3.addEventListener("click", () => {
//             mainholder.innerHTML == `<div class="anschecker">Correct Answer</div>
//            <button class="nextquestion">Next</button>`
//            console.log("correct")
//             // console.log(questions[0].options[1])
//     });}
//     if (correctopt == option4.innerHTML) {
//             option4.addEventListener("click", () => {
//               mainholder.innerHTML == `<div class="anschecker">Correct Answer</div>
//            <button class="nextquestion">Next</button>`
//            console.log("correct")
//               // console.log(questions[0].options[1])
//     });}
//           }
//         }

// main()
let ans = document.querySelector(".ans");
let mainholder = document.querySelector(".qanda");
let questionbox = document.querySelector(".ques");
let option1 = document.querySelector(".opt1");
let option2 = document.querySelector(".opt2");
let option3 = document.querySelector(".opt3");
let option4 = document.querySelector(".opt4");
let points = document.querySelector(".points");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetch questions from API
async function fetcher() {
  
  const url =
    "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    // Transform the data
    const formattedQuestions = json.results.map((item) => {
      const options = [...item.incorrect_answers, item.correct_answer];
      return {
        question: item.question,
        options: shuffleArray(options), // Shuffle options for randomness
        correctOption: item.correct_answer,
      };
    });

    return formattedQuestions;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

// Shuffle options randomly
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Display the current question
function displayQuestion() {
  let ans = document.querySelector(".ans");
  let mainholder = document.querySelector(".qanda");
  let questionbox = document.querySelector(".ques");
  let option1 = document.querySelector(".opt1");
  let option2 = document.querySelector(".opt2");
  let option3 = document.querySelector(".opt3");
  let option4 = document.querySelector(".opt4");
  let points = document.querySelector(".points");
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion);
    questionbox.innerHTML = currentQuestion.question;
    option1.innerHTML = currentQuestion.options[0];
    option2.innerHTML = currentQuestion.options[1];
    option3.innerHTML = currentQuestion.options[2];
    option4.innerHTML = currentQuestion.options[3];
    points.innerHTML = score
    attachOptionListeners(currentQuestion);
  } else {
    mainholder.innerHTML = `<div class="final-score">Quiz Complete! Your Score: ${score} Out of 10</div>`;
  }
}

// Attach click listeners to options
function attachOptionListeners(question) {
  let ans = document.querySelector(".ans");
  let mainholder = document.querySelector(".qanda");
  let questionbox = document.querySelector(".ques");
  let option1 = document.querySelector(".opt1");
  let option2 = document.querySelector(".opt2");
  let option3 = document.querySelector(".opt3");
  let option4 = document.querySelector(".opt4");
  let points = document.querySelector(".points");
  const options = [option1, option2, option3, option4];

  options.forEach((optionElement, index) => {
    optionElement.onclick = () => {
      if (optionElement.innerHTML === question.correctOption) {
        score++;
        mainholder.innerHTML = `<div class="anschecker">Correct Answer</div>
          <button class="nextquestion">Next</button>`;
      } else {
        mainholder.innerHTML = `<div class="anschecker">Wrong Answer</div>
        <div class="correctanswershower">The Correct Answer is ${question.correctOption}</div>
          <button class="nextquestion">Next</button>`;
      }

      document.querySelector(".nextquestion").onclick = () => {
        mainholder.innerHTML = "";
        let createquestionbox = document.createElement("div");
        createquestionbox.className = "ques";

        let createans = document.createElement("div");
        createans.className = "ans";

        let createoption1 = document.createElement("div");
        createoption1.className = "optn opt1";

        let createoption2 = document.createElement("div");
        createoption2.className = "optn opt2";

        let createoption3 = document.createElement("div");
        createoption3.className = "optn opt3";

        let createoption4 = document.createElement("div");
        createoption4.className = "optn opt4";

        currentQuestionIndex++;
        mainholder.appendChild(createquestionbox);
        mainholder.appendChild(createans);

        createans.appendChild(createoption1);
        createans.appendChild(createoption2);
        createans.appendChild(createoption3);
        createans.appendChild(createoption4);
        displayQuestion();
      };
    };
  });
}

// Main function to load and display questions
async function main() {
  questions = await fetcher();
  if (questions.length > 0) {
    displayQuestion();
  } else {
    mainholder.innerHTML = `<div class="error">Failed to load questions. Please try again later.</div>`;
  }
}
main();
