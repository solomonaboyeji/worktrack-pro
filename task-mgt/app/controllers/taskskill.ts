import { successResMsg, errorResMsg } from "../helpers/response";
import  TaskSkillService from "../services/taskskill";
import { v4 as uuidv4 } from 'uuid';



class  TaskSkillController { 
    // Add new task
        async  addTaskSkill(req: any, res: any): Promise<any> {
                const taskSkillBody = req.body 
                taskSkillBody.taskSkillId = uuidv4()
        try {
                const isTaskSkillExist = await TaskSkillService.findOne({taskId:taskSkillBody.taskId, skillId: taskSkillBody.skillId});
                if (isTaskSkillExist) return res.status(400).send({ status: 400, message: 'Task skill already exists' });
                const savetaskskill = await TaskSkillService.createOne(taskSkillBody);
                return res.status(201).send({ status: 201, message: 'Task skill created successfully',  data: savetaskskill });
        } catch (err) {
                console.log(err);
                return res.status(500).send({ status: 500, message: 'Error while creating task skill'});
        }
        }
    
    // get all task
        async  getTaskSkills(req: any, res: any): Promise<any> {
        try {
                let query
                if(req.query.taskId){
                   query = {taskId :req.query.taskId}
                }else{
                   query = {}
                }
                const gettaskskill = await TaskSkillService.findAll(query);
                return res.status(200).send({ status: 200, message: 'Task skill fetched successfully',  data: gettaskskill });
        } catch (err) {
                console.log(err);
                return res.status(500).send({ status: 500, message: 'Error while getting task'});
        }
        }

        // get task by id
        async getTaskSkillById(req: any, res: any): Promise<any> {
                const taskId = req.params.taskId
                try {
                        const getsingletaskskill = await TaskSkillService.findOne({taskId});
                        if(!getsingletaskskill ) return res.status(400).send({ status: 201, message: 'Task not found',  data: null });

                        return res.status(200).send({ status: 200, message: 'Task skill fetched successfully',  data: getsingletaskskill });
                } catch (err) {
                        console.log(err);
                        return res.status(500).send({ status: 500, message: 'Error while getting task skill'});
                }
        }

        //update task by id
        // async updateTaskById(req: any, res: any): Promise<any> {
        //         const taskBody = req.body 
        //         const taskId = req.params.taskId
        //         try {

        //                 const getsingletask = await TaskService.findOne({taskId});
        //                 if(!getsingletask ) return res.status(400).send({ status: 201, message: 'Task not found',  data: null });
        //                 const updateTask = await TaskService.updateOne({taskId},taskBody );
        //                 const gettasknew = await TaskService.findOne({taskId});
        //                 return res.status(201).send({ status: 201, message: 'Task updated successfully',  data: gettasknew });
        //         } catch (err) {
        //                 console.log(err);
        //                 return res.status(500).send({ status: 500, message: 'Error while updating task'});
        //         }
        // }

}

export default new TaskSkillController();


