using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Text.Json.Serialization;

namespace JobTrackPro.Models
{
    public class Skill
    {

        [Key, Required]
        public required string id { get; set; }

        public required string title { get; set; }

        public  string description { get; set; }

        public required DateTime created_at { get; set; }

        public required DateTime updated_at { get; set; }
    }
}
