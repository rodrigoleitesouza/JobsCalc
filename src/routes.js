const express = require('express');
const routes = express.Router();

const views = __dirname + "/views/";

const Profile = {
  data: {
    name: "Rodrigo",
    avatar: "https://github.com/rodrigoleitesouza.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75,
  },

  controllers: {
    index(req, res) {
      return res.render(views + "profile", { profile: Profile.data })
    },

    update(req, res) {
      const data = req.body;
      const weeksPerYear = 52;
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
      const monthlyTotalHours = weekTotalHours * weeksPerMonth;
      const valueHour = data["monthly-budget"] / monthlyTotalHours;

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour,
      };

      return res.redirect('/profile');
    },
  },
};

const Job = {
  data: [
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
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaning = Job.services.remaningDays(job);
        const status = remaning <= 0 ? "done" : "progress";
        return {
          ...job,
          remaning,
          status,
          budget: Profile.data["value-hour"] * job["total-hours"],
        };
      });
      return res.render(views + "index", { jobs: updatedJobs })
    },

    create(req, res) {
      return res.render(views + "job")
    },

    save(req, res) {
      const lastId = Job.data[Job.data.length - 1]?.id || 1;

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now(),
      })
      return res.redirect('/')
    },

    show(req, res) {
      const jobId = req.params.id;

      const job = Job.data.find(job => job.id === jobId);

      return res.render(views + "job-edit", { job });
    },
  },

  services: {
    remaningDays(job) {
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed(1);

      const createdDate = new Date(job.created_at);

      const dueDay = createdDate.getDate() + Number(remainingDays);

      const dueDateInMs = createdDate.setDate(dueDay);

      const timeDiffInMs = dueDateInMs - Date.now();

      const dayInMs = 1000 * 60 * 60 * 24

      const dayDiff = Math.floor(timeDiffInMs / dayInMs);

      return dayDiff;
    }
  },
};

routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);
routes.get('/job/:id', Job.controllers.show);
routes.get('/profile', Profile.controllers.index );
routes.post('/profile', Profile.controllers.update );

module.exports = routes;
