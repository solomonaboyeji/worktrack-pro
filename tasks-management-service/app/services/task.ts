import  {db, }  from "../models";

import {initModel} from "../models/init-model";
const model = initModel(db.sequelize);

class TaskService {
 
  async createOne(data:any) {
    const res = await model.task.create(data);
    return res;
  }

  async updateOne(query: any, data:any) {
    const res = await model.task.update(data, {where: query});
    return res;
  }

  async findOne(query: any) {
    console.log(query)
    const res = await model.task.findOne({
      where: query,
    });

    return res;
  }


  async deleteOne(id:any) {
    return await model.task.destroy({
      where: { customerProductId: id },
    });
  }

  async findAll(query = {}) {
    const res = await model.task.findAll({
      where: query,
      include: [],
    });
    return res;
  }



 


}

export default new TaskService();