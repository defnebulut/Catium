using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CleanArchitecture.Infrastructure.Migrations
{
    public partial class ArticleTest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rate",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Products",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Products",
                newName: "Subcategory");

            migrationBuilder.RenameColumn(
                name: "Barcode",
                table: "Products",
                newName: "CoverPicture");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Products",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Subcategory",
                table: "Products",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "CoverPicture",
                table: "Products",
                newName: "Barcode");

            migrationBuilder.AddColumn<decimal>(
                name: "Rate",
                table: "Products",
                type: "decimal(18,6)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
