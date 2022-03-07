import * as questionService from "../../services/questionService.js";
import * as optionService from "../../static/optionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  title: [validasaur.required, validasaur.minLength(1)],
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    title: params.get("title"),
    question_text: params.get("question_text"),
  };
};

const addQuestion = async ({ request, response, user, render }) => {
  const questionData = await getQuestionData(request);

  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules,
  );
  
  if (!passes) {
    console.log(errors);
    questionData.validationErrors = errors;
    questionData.questions = await questionService.listQuestions(user.id);
    return render("questions.eta", questionData);
  } else {
    await questionService.addQuestion(
      user.id,
      questionData.title,
      questionData.question_text,
    );     
  }     
  response.redirect("/questions", questionData);
};

const listQuestions = async ({ render, user, request }) => {
  render("questions.eta", { questions: await questionService.listQuestions(user.id) });
};

const showQuestion = async ({ params, render }) => {
  const data = {
    question: await questionService.showQuestion(params.id),
    options: await optionService.listOptions(params.id),
  }
  render("question.eta", data);
};

const deleteQuestion = async ({response, params}) => {
  await questionService.deleteQuestion(params.id);
  response.redirect(`/questions`);
};

export { addQuestion, listQuestions, showQuestion, deleteQuestion };