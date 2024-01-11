import { successResMsg, errorResMsg } from "../helpers/response";
import  TaskService from "../services/task";
import { v4 as uuidv4 } from 'uuid';



class  TaskController { 
    // Add new task
        async  addTask(req: any, res: any): Promise<any> {
                const taskBody = req.body 
                taskBody.taskId = uuidv4()
        try {
                const isTaskExist = await TaskService.findOne({refNumber:taskBody.refNumber});
                if (isTaskExist) return res.status(400).send({ status: 400, message: 'Task already exists' });
                const savetask = await TaskService.createOne(taskBody);
                return res.status(201).send({ status: 201, message: 'Task created successfully',  data: savetask });
        } catch (err) {
                console.log(err);
                return res.status(500).send({ status: 500, message: 'Error while creating task'});
        }
        }
    
    // get all task
        async  getAllTask(req: any, res: any): Promise<any> {
        try {
                const gettask = await TaskService.findAll({});
                return res.status(200).send({ status: 200, message: 'Task fetched successfully',  data: gettask });
        } catch (err) {
                console.log(err);
                return res.status(500).send({ status: 500, message: 'Error while getting task'});
        }
        }

        // get task by id
        async getTaskById(req: any, res: any): Promise<any> {
                const taskId = req.params.taskId
                try {
                        const getsingletask = await TaskService.findOne({taskId});
                        if(!getsingletask ) return res.status(400).send({ status: 201, message: 'Task not found',  data: null });

                        return res.status(200).send({ status: 200, message: 'Task fetched successfully',  data: getsingletask });
                } catch (err) {
                        console.log(err);
                        return res.status(500).send({ status: 500, message: 'Error while getting task'});
                }
        }

        //update task by id
        async updateTaskById(req: any, res: any): Promise<any> {
                const taskBody = req.body 
                const taskId = req.params.taskId
                try {

                        const getsingletask = await TaskService.findOne({taskId});
                        if(!getsingletask ) return res.status(400).send({ status: 201, message: 'Task not found',  data: null });
                        const updateTask = await TaskService.updateOne({taskId},taskBody );
                        const gettasknew = await TaskService.findOne({taskId});
                        return res.status(201).send({ status: 201, message: 'Task updated successfully',  data: gettasknew });
                } catch (err) {
                        console.log(err);
                        return res.status(500).send({ status: 500, message: 'Error while updating task'});
                }
        }

}

export default new TaskController();


