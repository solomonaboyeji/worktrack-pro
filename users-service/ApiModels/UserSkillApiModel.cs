using System.ComponentModel.DataAnnotations;

namespace JobTrackPro.ApiModels
{
    public class UserSkillApiModel
    {
    }
    public class UserSkillRequestModel
    {
        public required string skillId { get; set; }
        public required string userId { get; set; }
    }
    public class UserSkillResponseModel
    {

        [Key, Required]
        public required string id { get; set; }
        public required  UserResponseModelNew user { get; set; }
        public required  SkillResponseModelNew skill { get; set; }

        public required DateTime createdAt { get; set; }

        public required DateTime updatedAt { get; set; }
    }
    public class UserResponseModelNew
    {
        public required string id { get; set; }
        public required string firstName { get; set; }

        public required string lastName { get; set; }

        public required string email { get; set; }
    }
    public class SkillResponseModelNew
    {
        public required string id { get; set; }
        public required string title { get; set; }
        public string description { get; set; }
       
    }

}
