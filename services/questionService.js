import { executeQuery } from "../database/database.js";

const addQuestion = async (user_id, title, question_text) => {
  await executeQuery(
    `INSERT INTO questions
      (user_id, title, question_text)
        VALUES ($1, $2, $3)`,
    user_id,
    title,
    question_text,
  );
};

const listQuestions = async (user_id) => {
  const res = await executeQuery(`SELECT * FROM questions WHERE user_id = $1;`, user_id);
  return res.rows;
};

const showQuestion = async (question_id) => {
  const res = await executeQuery(`SELECT * FROM questions WHERE id = $1;`, question_id);
  return res.rows[0];
};

const deleteQuestion = async (id) => {
  return await executeQuery("DELETE FROM questions WHERE id = $1;", id);
};

const randomQuestion = async () => {
  const question = await executeQuery(`
    SELECT * FROM questions
    ORDER BY random()
    LIMIT 1;`
  );

  const question_id = question.rows[0].id;

  if(!question_id){
    return {};
  }

  const question_answer_options = await executeQuery(`
    SELECT id, option_text FROM question_answer_options 
    WHERE question_id = $1;`,
    question_id
  );

  const options = question_answer_options.rows

  for (let i = 0; i < options.length; i++) {
    options[i].optionId = options[i].id;
    options[i].optionText = options[i].option_text;
    delete options[i].id;
    delete options[i].option_text;
  }
  const data = {
    "questionId" : question.rows[0].id,
    "questionTitle" : question.rows[0].title,
    "questionText" : question.rows[0].question_text,
    "answerOptions" : options,
  }

  return data;
};

const answerQuestion = async (question_id, option_id) => {
  const res = await executeQuery(`
    SELECT is_correct FROM question_answer_options 
    WHERE question_id = $1 AND id = $2;`, 
    question_id,
    option_id
  );
  const correct = res.rows[0];
  correct.correct = correct.is_correct;
  delete correct.is_correct;
  return correct;
};


export { addQuestion, listQuestions, showQuestion, deleteQuestion, randomQuestion, answerQuestion };