using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Features.Likes.Queries.GetLikeIdByUserandArticleId
{
    public class GetLikeIdByUserandArticleIdViewModel
    {
        public int Id { get; set; }
        public string UserID { get; set; }
        public int ArticleId { get; set; }
    }
}
