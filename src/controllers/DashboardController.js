const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    const updatedJobs = jobs.map((job) => {

      const remaning = JobUtils.remaningDays(job);

      const status = remaning <= 0 ? "done" : "progress";

      statusCount[status] += 1;

      return {
        ...job,
        remaning,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };

    });

    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
    });
  },
};
