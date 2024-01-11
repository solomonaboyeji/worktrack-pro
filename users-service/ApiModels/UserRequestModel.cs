using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using JobTrackPro.Models;

namespace JobTrackPro.ApiModels
{
    public class UserRequestModel
    {

        public required string firstName { get; set; }

        public required string lastName { get; set; }

        public required string email { get; set; }

        public required string phoneNumber { get; set; }

        public required string password { get; set; }

        public required bool isLegalStatus { get; set; }

        public required DateTime starTime { get; set; }


        public required DateTime dob { get; set; }

        public required string postCode { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public required UserRole role { get; set; }

        
    }

    public class SignInUserRequestModel
    {
        public required string password { get; set; }
        
        public required string email { get; set; }
      
    }

    public class SignInUserResponseModel
    {
        public required string token { get; set; } // JWTken

        public required UserModel profile { get; set; } // User information
    }


    public class ChangePasswordRequestModel
    {
        public required string oldPassword { get; set; } // JWTken

        public required string newPassword { get; set; } // User information
    }
}
