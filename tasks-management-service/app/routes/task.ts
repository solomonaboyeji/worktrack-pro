import { Router } from "express";
const taskRouter = Router();

import { verifyToken, isAdmin , isMember} from '../helpers/jwtTokenUtils';

import * as validator from "../validators/validator";
 const {expressValidator, postTaskValidator, updateTaskValidator} = validator

import taskController from "../controllers/task";

taskRouter.post('/', postTaskValidator(), expressValidator, taskController.addTask);

taskRouter.get('/',   taskController.getAllTask);

taskRouter.get('/:taskId',   taskController.getTaskById);

taskRouter.put('/:taskId',  updateTaskValidator(), expressValidator,   taskController.updateTaskById);

export default taskRouter;
