using System.ComponentModel.DataAnnotations;

namespace JobTrackPro.ApiModels
{
    public class UserTaskApiModel
    {
    }
    public class UserTaskRequestModel
    {
        public required string taskId { get; set; }
        public required string taskName { get; set; }
        public required string userId { get; set; }
    }
    public class UserTaskResponseModel
    {

        [Key, Required]
        public required string id { get; set; }
        public required UserResponseModelNew user { get; set; }
        public required string taskId { get; set; }
        public required string taskName { get; set; }
        public required DateTime createdAt { get; set; }
        public required DateTime updatedAt { get; set; }
    }

    
}
