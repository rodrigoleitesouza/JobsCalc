const express = require('express');
const routes = express.Router();

const views = __dirname + "/views/";

const profile = {
  name: "Rodrigo",
  avatar: "https://github.com/rodrigoleitesouza.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
  "value-hour": 75,
};

const jobs = [
  {
    id: 1,
    name: "Rodrigo",
    "daily-hours": 2,
    "total-hours": 1,
    created_at: Date.now(),
  },
  {
    id: 2,
    name: "Milena",
    "daily-hours": 99,
    "total-hours": 999,
    created_at: Date.now(),
  },
];


function remaningDays(job) {
  const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed(1);

  const createdDate = new Date(job.created_at);

  const dueDay = createdDate.getDate() + Number(remainingDays);

  const dueDateInMs = createdDate.setDate(dueDay);

  const timeDiffInMs = dueDateInMs - Date.now();

  const dayInMs = 1000 * 60 * 60 * 24

  const dayDiff = Math.floor(timeDiffInMs / dayInMs);

  return dayDiff;
}


routes.get('/', (req, res) => {
  const updatedJobs = jobs.map((job) => {
    
    const remaning = remaningDays(job);
    const status = remaning <= 0 ? "done" : "progress";

    return {
      ...job,
      remaning,
      status,
      budget: profile["value-hour"] * job["total-hours"],

    };
  });



  res.render(views + "index", { jobs: updatedJobs })
})

routes.get('/job', (req, res) => res.render(views + "job"));

routes.post('/job', (req, res) => {
  const lastId = jobs[jobs.length - 1]?.id || 1;

  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    "daily-hours": req.body["daily-hours"],
    "total-hours": req.body["total-hours"],
    created_at: Date.now(),
  })
  return res.redirect('/')
});

routes.get('/job/edit', (req, res) => res.render(views + "job-edit"));
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }));

module.exports = routes;
