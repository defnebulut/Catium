using System;

namespace CleanArchitecture.Core.Features.Products.Queries.GetAllProducts
{
    public class GetAllArticlesViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Category { get; set; }
        public string CoverPicture { get; set; }
        public string Content { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        
    }
}
