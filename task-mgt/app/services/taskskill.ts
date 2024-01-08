import  {db, }  from "../models";

import {initModel} from "../models/init-model";
const model = initModel(db.sequelize);

class TaskSkillService {
 
  async createOne(data:any) {
    const res = await model.taskskill.create(data);
    return res;
  }

  async updateOne(query: any, data:any) {
    const res = await model.taskskill.update(data, {where: query});
    return res;
  }

  async findOne(query: any) {
    console.log(query)
    const res = await model.taskskill.findOne({
      where: query,
    });

    return res;
  }


  async deleteOne(id:any) {
    return await model.taskskill.destroy({
      where: { customerProductId: id },
    });
  }

  async findAll(query = {}) {
    const res = await model.taskskill.findAll({
      where: query,
      include: [],
    });
    return res;
  }



 


}

export default new TaskSkillService();