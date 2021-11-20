const router = require("express").Router();
const db = require("../models");

//pull all workouts and add them up for stats 
router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
        totalWeight: { $sum: "$exercises.weight" },
        totalSets: { $sum: "$exercises.sets" },
        totalReps: { $sum: "$exercises.reps" },
      },
    },
  ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//create a new workout 
router.post("/api/workouts", ({ body }, res) => {
  console.log(body);
  db.Workout.create(body)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


// pull all workouts and add them up for stats visual display. also sort them by day 
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
        totalWeight: { $sum: "$exercises.weight" },
        totalSets: { $sum: "$exercises.sets" },
        totalReps: { $sum: "$exercises.reps" },
      },
    },
  ])
    .sort({ day: -1 })
    .limit(7)
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;