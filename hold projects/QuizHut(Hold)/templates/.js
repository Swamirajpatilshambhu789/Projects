async function fetcher() {
    const url =
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";
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
    }
  }

  