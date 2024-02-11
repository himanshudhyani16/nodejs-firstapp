import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newtask = async (req, resp, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    resp.status(201).json({
      success: true,
      message: "task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getmytask = async (req, resp) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    resp.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updatetask = async (req, resp, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Invalid Task", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();
    resp.status(200).json({
      success: true,
      message: "task update!",
    });
  } catch (error) {
    next(error);
  }
};

export const deletetask = async (req, resp, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    await task.deleteOne();

    resp.status(200).json({
      success: true,
      message: "task deleted!",
    });
  } catch (error) {
    next(error);
  }
};
