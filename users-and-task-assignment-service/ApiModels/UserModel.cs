using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using JobTrackPro.Models;

namespace JobTrackPro.ApiModels
{
    public class UserModel
    {
      
        public required string id { get; set; }

        public required  string firstName { get; set; }

        public required string lastName { get; set; }

        public required string email { get; set; }

        public required string phoneNumber { get; set; }

        public required bool isLegalStatus { get; set; }

        public required DateTime starTime { get; set; }

        
        public required DateTime dob { get; set; }

        public required string postCode { get; set; }

        public required bool isVerified { get; set; }

        public required bool isEnabled { get; set; }


        [JsonConverter(typeof(JsonStringEnumConverter))]
        public required UserRole role { get; set; }

        public required DateTime createdAt { get; set; }
      

        public required DateTime updatedAt { get; set; }
    }
}
