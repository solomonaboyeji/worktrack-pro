using Microsoft.EntityFrameworkCore;


namespace JobTrackPro.Models
{
    public class Model_DataContext : DbContext
    {
        public Model_DataContext(DbContextOptions<Model_DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Skill> Skills { get; set; }

        public DbSet<UserSkill> UserSkills { get; set; }
        public DbSet<UserTask> UserTasks { get; set; }

    }
}
