import { Router } from 'express';

import taskRouter from './task';

import taskSkillRouter from './taskskill';



const routes = Router();


routes.use('/task', taskRouter);
routes.use('/taskskill', taskSkillRouter);

export default routes;