import { executeQuery } from "../database/database.js";


const randomQuiz = async (user_id) => {
  const res = await executeQuery(`
    SELECT id FROM questions
    WHERE user_id != $1
    ORDER BY random()
    LIMIT 1;`,
    user_id
  );
  return res.rows[0].id;
};

const checkOption = async (option_id) => {
  const res = await executeQuery(`SELECT is_correct FROM question_answer_options WHERE id = $1;`, option_id);
  return res.rows[0].is_correct;
};

const addUserOption = async (user_id, question_id, question_answer_option_id, correct) => {
  await executeQuery(
    `INSERT INTO question_answers
      (user_id, question_id, question_answer_option_id, correct)
        VALUES ($1, $2, $3, $4)`,
    user_id,
    question_id,
    question_answer_option_id,
    correct,
  );
};

const findCorrectOption = async (question_id) => {
  const res = await executeQuery(`SELECT option_text FROM question_answer_options WHERE question_id = $1 AND is_correct = true;`, question_id);
  return res.rows[0].option_text;
};


export { randomQuiz, checkOption, addUserOption, findCorrectOption };