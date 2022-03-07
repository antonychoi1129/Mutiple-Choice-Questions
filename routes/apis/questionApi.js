import * as questionService from "../../services/questionService.js";

const randomQuestion = async ({ response }) => {
  const question = await questionService.randomQuestion();

  response.body = question;
};

const answerQuestion = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const document = await body.value;

    const correct = await questionService.answerQuestion(document.questionId, document.optionId);
    
    response.body = correct;
};


export { randomQuestion, answerQuestion };