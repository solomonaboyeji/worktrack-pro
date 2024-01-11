using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobTrackPro.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserFixisenabled : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isEnabled",
                table: "Users",
                newName: "is_enabled");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "is_enabled",
                table: "Users",
                newName: "isEnabled");
        }
    }
}
