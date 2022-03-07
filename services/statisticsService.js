import { executeQuery } from "../database/database.js";

const findFiveUsersWithMostAnsweredQuestions = async () => {
  const res = await executeQuery(
    `SELECT users.email as email, count(*) as count FROM users
    JOIN question_answers ON users.id = question_answers.user_id
    WHERE question_answers.correct = true
    GROUP BY users.email
    ORDER BY count DESC
    LIMIT 5`,
  );

  return res.rows;
};

const findAnsweredQuestions = async (user_id) => {
    const res = await executeQuery(
      `SELECT question_id, 
            count(*) as answer_count,
            sum(case when user_id = $1 and correct = true then 1 else 0 end) as correct_count
      FROM question_answers
      WHERE user_id = $1
      GROUP BY question_id
      ORDER BY answer_count DESC;`
      ,
      user_id
    );
    return res.rows;
};


export { findFiveUsersWithMostAnsweredQuestions, findAnsweredQuestions };