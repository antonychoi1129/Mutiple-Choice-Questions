import { executeQuery } from "../database/database.js";

const addOption = async (question_id, option_text, is_correct) => {
  await executeQuery(
    `INSERT INTO question_answer_options
      (question_id, option_text, is_correct)
        VALUES ($1, $2, $3)`,
    question_id,
    option_text,
    is_correct,
  );
};

const listOptions = async (question_id) => {
    const res = await executeQuery(`SELECT * FROM question_answer_options WHERE question_id = $1;`,
        question_id
    );
    return res.rows;
};

const deleteOption = async (id) => {
  return await executeQuery("DELETE FROM question_answer_options WHERE id = $1;", id);
};
export { addOption, listOptions, deleteOption };