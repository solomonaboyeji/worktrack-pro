using JobTrackPro.ApiModels;
using JobTrackPro.Helpers;
using JobTrackPro.Models;

namespace JobTrackPro.Sevices
{
    public class SkillService
    {

        private Model_DataContext _context;

        public SkillService(Model_DataContext context)
        {
            _context = context;
        }

        public List<SkillResponseModel> GetSkills()
        {
            List<SkillResponseModel> response = new List<SkillResponseModel>();
            var datalist = _context.Skills.ToList();
            datalist.ForEach(row => response.Add(new SkillResponseModel()
            {
                title = row.title,
                description = row.description,
                id = row.id,
                createdAt = row.created_at,
                updatedAt = row.updated_at
            }));

            return response;
        }
   
        public SkillResponseModel? GetSkillById(string id)
        {
            var row = _context.Skills.Where(d => d.id.Equals(id)).FirstOrDefault();
            if (row != null)
            {
                return new SkillResponseModel()
                {

                    title = row.title,
                    description = row.description,
                    id = row.id,
                    createdAt = row.created_at,
                    updatedAt = row.updated_at
                };
            }
            else
            {
                return null; // or throw new Exception("User not found!");
            }

        }

        public SkillResponseModel? GetSkillByTitle(string title)
        {
            var row = _context.Skills.Where(d => d.title.Equals(title)).FirstOrDefault();
            if (row != null)
            {
                return new SkillResponseModel()
                {

                    title = row.title,
                    description = row.description,
                    id = row.id,
                    createdAt = row.created_at,
                    updatedAt = row.updated_at
                };
            }
            else
            {
                return null; // or throw new Exception("User not found!");
            }

        }

        
        public SkillResponseModel CreateSkill(SkillRequestModel skillBody)
        {
            RandomStringGenerator generator = new RandomStringGenerator();
            string randomId = generator.GenerateRandomString(8);

            DateTime currentDateTime = DateTime.Now;
            Console.WriteLine(currentDateTime);

            Skill dbTable = new Skill
            {
               
                id = randomId,
                title = skillBody.title,
                description = skillBody.description,
                created_at = currentDateTime,
                updated_at = currentDateTime
            };
            _context.Skills.Add(dbTable);
            _context.SaveChanges();
            return new SkillResponseModel()
            {
                id = randomId,
                title = skillBody.title,
                description = skillBody.description,
                createdAt = currentDateTime,
                updatedAt = currentDateTime
            };
        }
        public SkillResponseModel UpdateSkill(SkillRequestModel skillBody, string id)
        {
            var dbTable = _context.Skills.Where(d => d.id.Equals(id)).FirstOrDefault();

            if (dbTable != null)
            {
                dbTable.title = skillBody.title;
                dbTable.description = skillBody.description;
            }
            _context.SaveChanges();
            var row = _context.Skills.Where(d => d.id.Equals(id)).FirstOrDefault();
            return new SkillResponseModel()
            {
                id = row.id,
                description = row.description,
                title = row.title,
                createdAt = row.created_at,
                updatedAt = row.updated_at,
               
            };
        }

    }
}
