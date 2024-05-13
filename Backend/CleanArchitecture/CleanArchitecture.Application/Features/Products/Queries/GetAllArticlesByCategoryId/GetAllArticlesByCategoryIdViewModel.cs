using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByCategoryId
{
    public class GetAllArticlesByCategoryIdViewModel
    {
        public int ArticleId { get; set; }
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public string CoverPicture { get; set; }
        public string Content { get; set; }
        public string CreatedBy { get; set; }
    }
}
