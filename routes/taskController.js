const Task = require("../models/Task");
const express = require("express");

const router = express.Router();

// getAllTasks  endpoint

router.get("/getalltasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// createtask endpoint
router.post("/createtask", async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ title, description });
  try {
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// update a user by id
router.put("/updatetask/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, completed },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete task
router.delete("/deletetask/:taskId", async (req, res) => {
  const taskId = req.params.taskId;

  try {
    await Task.findByIdAndDelete(taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
