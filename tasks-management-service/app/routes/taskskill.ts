import { Router } from "express";
const taskSkillRouter = Router();

import { verifyToken, isAdmin , isMember} from '../helpers/jwtTokenUtils';

import * as validator from "../validators/validator";
 const {expressValidator, postTaskSkillValidator, updateTaskValidator} = validator

import taskSkillController from "../controllers/taskskill";

taskSkillRouter.post('/', postTaskSkillValidator(), expressValidator, taskSkillController.addTaskSkill);

taskSkillRouter.get('/',   taskSkillController.getTaskSkills);

taskSkillRouter.get('/:taskId',   taskSkillController.getTaskSkillById);

//taskSkillRouter.put('/:taskId',  updateTaskValidator(), expressValidator,   taskController.updateTaskById);

export default taskSkillRouter;
