using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace JobTrackPro.Models
{
    public enum UserRole
    {
        Admin,
        Staff
    }


    public class User
    {


        [Key, Required]
        public required  string id { get; set; }

        public required string first_name { get; set; }

        public required string last_name  { get; set; }

        public required string email { get; set; }

        public required string phone_number { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public required UserRole role { get; set; }
        public required Boolean is_legal_status { get; set; }

        public required DateTime start_time { get; set; }

        public required DateTime dob { get; set; }

        public required string post_code { get; set; }

        public required string password { get; set; }

        public  string? forgot_password_code { get; set; }

        [DefaultValue(true)]
        public required Boolean is_verified { get; set; }

        [DefaultValue(false)]
        public required Boolean is_enabled { get; set; }

        public  string? verification_code { get; set; }

        public required DateTime created_at { get; set; }

        public required DateTime updated_at { get; set; }
    }
}
