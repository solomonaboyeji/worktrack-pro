using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobTrackPro.Migrations
{
    /// <inheritdoc />
    public partial class UserTaskadddIsdelted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                table: "UserTasks",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_deleted",
                table: "UserTasks");
        }
    }
}
