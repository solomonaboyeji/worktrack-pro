using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobTrackPro.Models
{
    public class UserTask
    {
        [Key]
        public string id { get; set; }

        [ForeignKey("user_id")]
        public virtual User user { get; set; }
        public string user_id { get; set; }
        public string task_id { get; set; }
        public string task_name{ get; set; }
        public required Boolean is_deleted { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }
}
