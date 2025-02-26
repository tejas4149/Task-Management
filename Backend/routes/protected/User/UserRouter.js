import { Router } from "express";
import {
  errorResponse,
  successResponse,
} from "../../../utils/serverResponse.js";
import TaskModel from "../../../models/TaskModel.js";

const UserRouter = Router();

//api
UserRouter.get("/get-task", getUserTaskController);
UserRouter.put("/update-task", updateUserTaskController);

export default UserRouter;

//controller for the user task
async function getUserTaskController(req, res) {
  try {
    const tasks = await TaskModel.find();
    successResponse(res, "All tasks", tasks);
  } catch (error) {
    console.log("_getUserTaskController_", error);
    return errorResponse(res, 500, "Internal server error");
  }
}

// controller for the update user task
async function updateUserTaskController(req, res) {
  try {
    const { status } = req.body;
    const updateTask = await TaskModel.findByIdAndUpdate(status);

    if (!updateTask) {
      return errorResponse(res, 400, "Task not found");
    }

    successResponse(res, "Task updated sucessfully", updateTask);
  } catch (error) {
    console.log("_updateUserTaskController_", error);
    return errorResponse(res, 500, "Internal server error");
  }
}
