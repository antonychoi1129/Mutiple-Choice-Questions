import * as statisticsService from "../../services/statisticsService.js";

const showStatistics = async ({ render, user }) => {
  const statistics = {
    answeredQuestions: await statisticsService.findAnsweredQuestions(user.id),
    mostAnsweredQuestions: await statisticsService.findFiveUsersWithMostAnsweredQuestions(),
  };
  render("statistics.eta", statistics);
};


export { showStatistics };