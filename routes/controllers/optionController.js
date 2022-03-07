import * as optionService from "../../static/optionService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const optionValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};

const getOptionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  let correct = false;
  if(params.get("is_correct") === "on")
    correct = true;

  return {
    option_text: params.get("option_text"),
    correct: correct,
  };
};

const addOption = async ({ request, response, params, render }) => {
  const optionData = await getOptionData(request);

  const [passes, errors] = await validasaur.validate(
    optionData,
    optionValidationRules,
  );

  if (!passes) {
    console.log(errors);
    optionData.validationErrors = errors;
    optionData.options = await optionService.listOptions(params.id);
    optionData.question = await questionService.showQuestion(params.id);
    return render("question.eta", optionData);
  } else {
    await optionService.addOption(
      params.id,
      optionData.option_text,
      optionData.correct,
    );
  }
  response.redirect(`/questions/${params.id}`);
};

const deleteOption = async ({response, params}) => {
  await optionService.deleteOption(params.optionId);
  response.redirect(`/questions/${params.questionId}`);
};

  
export { addOption, deleteOption };