using System.ComponentModel.DataAnnotations;

namespace JobTrackPro.ApiModels
{
    public class SkillApiModel
    {
    }
    public class SkillResponseModel
    {

        [Key, Required]
        public required string id { get; set; }

        public required string title { get; set; }

        public string description { get; set; }

        public required DateTime createdAt { get; set; }

        public required DateTime updatedAt { get; set; }
    }
    public class SkillRequestModel
    {


        public required string title { get; set; }

        public string description { get; set; }
    }

}
