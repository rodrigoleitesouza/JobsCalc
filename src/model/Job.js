let data = [
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
]

module.exports = {
  get() {
    return data;
  },

  update(newJob) {
    data = newJob;
  },

  delete(id) {
    data = data.filter((job) => Number(job.id) !== Number(id));
  },

  create(newJob) {
    data.push(newJob);
  },
}
