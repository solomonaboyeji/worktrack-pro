using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobTrackPro.Models
{
    public class UserSkill
    {
        [Key]
        public string id { get; set; }

        [ForeignKey("userId")]
        public virtual User user { get; set; }
        public string userId { get; set; }

        [ForeignKey("skillId")]
        public virtual Skill skill { get; set; }
        public string skillId { get; set; }

        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }
}