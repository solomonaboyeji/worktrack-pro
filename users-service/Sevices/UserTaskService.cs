using JobTrackPro.ApiModels;
using JobTrackPro.Helpers;
using JobTrackPro.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTrackPro.Sevices
{

    public class UserTaskService
    {

        private Model_DataContext _context;

        public UserTaskService(Model_DataContext context)
        {
            _context = context;
        }

        public List<UserTaskResponseModel> GetUserTasks()
        {
            List<UserTaskResponseModel> response = new List<UserTaskResponseModel>();
            var datalist = _context.UserTasks.Include(us => us.user).Where(us => us.is_deleted == false)
                .ToList();

            datalist.ForEach(row => response.Add(new UserTaskResponseModel()
            {

                id = row.id,
                user = new UserResponseModelNew
                {
                    id = row.user.id,
                    firstName = row.user.first_name,
                    email = row.user.email,
                    lastName = row.user.last_name
                },
                taskId = row.task_id,
                taskName = row.task_name,
                createdAt = row.created_at,
                updatedAt = row.updated_at
            }));

            return response;
        }

        public UserTaskResponseModel? GetUserTaskById(string id)
        {
            var row = _context.UserTasks
        .Include(us => us.user)
        .FirstOrDefault(d => d.id == id && d.is_deleted == false);
            if (row != null)
            {
                return new UserTaskResponseModel()
                {

                    id = row.id,
                    user = new UserResponseModelNew
                    {
                        id = row.user.id,
                        firstName = row.user.first_name,
                        email = row.user.email,
                        lastName = row.user.last_name
                    },
                    taskId = row.task_id,
                    taskName = row.task_name,
                    createdAt = row.created_at,
                    updatedAt = row.updated_at
                };
            }
            else
            {
                return null; // or throw new Exception("User not found!");
            }

        }
        public UserTaskResponseModel? getUserTaskByUserIdAndTaskId(UserTaskRequestModel userTasklBody)
        {
            var row = _context.UserTasks
              .Include(us => us.user)
              .FirstOrDefault(d => (d.user_id == userTasklBody.userId || d.task_id == userTasklBody.taskId) && d.is_deleted == false);
            if (row != null)
            {
                return new UserTaskResponseModel()
                {

                    id = row.id,
                    user = new UserResponseModelNew
                    {
                        id = row.user.id,
                        firstName = row.user.first_name,
                        email = row.user.email,
                        lastName = row.user.last_name
                    },
                    taskId = row.task_id,
                    taskName = row.task_name,
                    createdAt = row.created_at,
                    updatedAt = row.updated_at
                };
            }
            else
            {
                return null; // or throw new Exception("User not found!");
            }

        }

        public UserTaskResponseModel GetUserTask(string userId)
        {
        
            var row = _context.UserTasks
                 .Include(us => us.user)
                 .FirstOrDefault(d => d.user_id ==userId && d.is_deleted == false);

            if (row != null)
            {
                return new UserTaskResponseModel()
                {

                    id = row.id,
                    user = new UserResponseModelNew
                    {
                        id = row.user.id,
                        firstName = row.user.first_name,
                        email = row.user.email,
                        lastName = row.user.last_name
                    },
                    taskId = row.task_id,
                    taskName = row.task_name,
                    createdAt = row.created_at,
                    updatedAt = row.updated_at
                };
            }
            else
            {
                return null; // or throw new Exception("User not found!");
            }


        }

        public void CreateUserTask(UserTaskRequestModel userTaskBody)
        {
            RandomStringGenerator generator = new RandomStringGenerator();
            string randomId = generator.GenerateRandomString(8);

            DateTime currentDateTime = DateTime.Now;
            Console.WriteLine(currentDateTime);

            UserTask dbTable = new UserTask
            {

                id = randomId,
                task_id = userTaskBody.taskId,
                user_id = userTaskBody.userId,
                task_name = userTaskBody.taskName,
                created_at = currentDateTime,
                updated_at = currentDateTime,
                is_deleted = false
            };
            _context.UserTasks.Add(dbTable);
            _context.SaveChanges();

        }

        public void DeleteUserTask(string id)
        {
            var userskill = _context.UserTasks.Where(d => d.id.Equals(id)).FirstOrDefault();
            if (userskill != null)
            {
                userskill.is_deleted = true;
                _context.SaveChanges();
            }

        }
    }
}
