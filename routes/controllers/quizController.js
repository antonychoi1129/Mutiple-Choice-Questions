import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../static/optionService.js";

const randomQuiz = async ({ response, user }) => {
  const question_id = await quizService.randomQuiz(user.id);
  response.redirect(`/quiz/${question_id}`);
};

const showQuiz = async ({ render, params }) => {
  const data = {
    question: await questionService.showQuestion(params.id),
    options: await optionService.listOptions(params.id),
  }
  render("quiz.eta", data);
};

const selectOption = async ({ response, params, user }) => {
  const is_correct = await quizService.checkOption(params.optionId);
  await quizService.addUserOption(user.id, params.id, params.optionId, is_correct);
  if(is_correct){
    response.redirect(`/quiz/${params.id}/correct`);
  } else {
    response.redirect(`/quiz/${params.id}/incorrect`);
  }
};

const showCorrect = async ({ render }) => {
  render("correct.eta");
};

const showIncorrect = async ({ render, params }) => {
  const data = {
    option_text: await quizService.findCorrectOption(params.id),
  }
  render("incorrect.eta", data);
};


export { randomQuiz, showQuiz, selectOption, showCorrect, showIncorrect };