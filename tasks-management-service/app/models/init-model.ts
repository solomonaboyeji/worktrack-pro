import { Sequelize } from "sequelize-typescript";

import  {_task}  from "./task";
import { _taskskill } from "./task-skill";

const initModel = function initModels(sequelize: Sequelize) {
  var task = _task(sequelize);
  var taskskill = _taskskill(sequelize);
  return {
    task,
    taskskill
  };
}

export { initModel }
