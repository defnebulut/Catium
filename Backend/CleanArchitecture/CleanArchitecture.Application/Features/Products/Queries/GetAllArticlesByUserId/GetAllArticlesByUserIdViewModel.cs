using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByUserId
{
    public class GetAllArticlesByUserIdViewModel
    {
        public int ArticleId { get; set; }
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public string CoverPicture { get; set; }
        public string Content { get; set; }
    }
}
