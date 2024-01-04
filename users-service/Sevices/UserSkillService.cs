using JobTrackPro.ApiModels;
using JobTrackPro.Helpers;
using JobTrackPro.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace JobTrackPro.Sevices
{
    public class UserSkillService
    {

        private Model_DataContext _context;

        public UserSkillService(Model_DataContext context)
        {
            _context = context;
        }

        public List<UserSkillResponseModel> GetUserSkills()
        {
            List<UserSkillResponseModel> response = new List<UserSkillResponseModel>();
            var datalist = _context.UserSkills.Include(us => us.user).Include(us => us.skill)
                .ToList();

            datalist.ForEach(row => response.Add(new UserSkillResponseModel()
            {

                id = row.id,
                user = new UserResponseModelNew
                {
                    id = row.user.id,
                    firstName = row.user.first_name,
                    email = row.user.email,
                    lastName = row.user.last_name
                },
                skill = new SkillResponseModelNew
                {
                    id = row.skill.id,
                    title = row.skill.title,
                    description = row.skill.description
                },
                createdAt = row.created_at,
                updatedAt = row.updated_at
            }));

            return response;
        }

        public UserSkillResponseModel? GetUserSkillById(string id)
        {
            var row = _context.UserSkills
        .Include(us => us.user)
        .Include(us => us.skill)
        .FirstOrDefault(d => d.id.Equals(id));
            if (row != null)
            {
                return new UserSkillResponseModel()
                {

                    id = row.id,
                    user = new UserResponseModelNew
                    {
                        id = row.user.id,
                        firstName = row.user.first_name,
                        email = row.user.email,
                        lastName = row.user.last_name
                    },
                    skill = new SkillResponseModelNew
                    {
                        id = row.skill.id,
                        title = row.skill.title,
                        description = row.skill.description
                    },
                    createdAt = row.created_at,
                    updatedAt = row.updated_at
                };
            }
            else
            {
                return null; // or throw new Exception("User not found!");
            }

        }
        public UserSkillResponseModel? getUserSkillByUserIdAndSkillId(UserSkillRequestModel userSkillBody)
        {
            var row = _context.UserSkills
      .Include(us => us.user)
      .Include(us => us.skill)
      .FirstOrDefault(d => d.userId == userSkillBody.userId && d.skillId == userSkillBody.skillId);
            if (row != null)
            {
                return new UserSkillResponseModel()
                {

                    id = row.id,
                    user = new UserResponseModelNew
                    {
                        id = row.user.id,
                        firstName = row.user.first_name,
                        email = row.user.email,
                        lastName = row.user.last_name
                    },
                    skill = new SkillResponseModelNew
                    {
                        id = row.skill.id,
                        title = row.skill.title,
                        description = row.skill.description
                    },
                    createdAt = row.created_at,
                    updatedAt = row.updated_at
                };
            }
            else
            {
                return null; // or throw new Exception("User not found!");
            }

        }
        

        public List<UserSkillResponseModel> GetAllSkillsByUser(string userId)
        {
            List<UserSkillResponseModel> response = new List<UserSkillResponseModel>();
            var datalist = _context.UserSkills
                .Include(us => us.user)
                .Include(us => us.skill)
                .Where(us => us.userId == userId)
                .ToList();

            datalist.ForEach(row => response.Add(new UserSkillResponseModel()
            {

                id = row.id,
                user = new UserResponseModelNew
                {
                    id = row.user.id,
                    firstName = row.user.first_name,
                    email = row.user.email,
                    lastName = row.user.last_name
                },
                skill = new SkillResponseModelNew
                {
                    id = row.skill.id,
                    title = row.skill.title,
                    description = row.skill.description
                },
                createdAt = row.created_at,
                updatedAt = row.updated_at
            }));

            return response;
        }

        public void CreateUserSkill(UserSkillRequestModel userSkillBody)
        {
            RandomStringGenerator generator = new RandomStringGenerator();
            string randomId = generator.GenerateRandomString(8);

            DateTime currentDateTime = DateTime.Now;
            Console.WriteLine(currentDateTime);

            UserSkill dbTable = new UserSkill
            {

                id = randomId,
                skillId = userSkillBody.skillId,
                userId = userSkillBody.userId,
                created_at = currentDateTime,
                updated_at = currentDateTime
            };
            _context.UserSkills.Add(dbTable);
            _context.SaveChanges();
           
        }

        public void DeleteUserSkill(string id)
        {
            var userskill = _context.UserSkills.Where(d => d.id.Equals(id)).FirstOrDefault();
            if (userskill != null)
            {
                _context.UserSkills.Remove(userskill);
                _context.SaveChanges();
            }

        }
    }
}
