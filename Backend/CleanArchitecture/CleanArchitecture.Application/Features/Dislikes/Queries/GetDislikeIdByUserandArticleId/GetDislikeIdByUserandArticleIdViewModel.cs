using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Features.Dislikes.Queries.GetDislikeIdByUserandArticleId
{
    public class GetDislikeIdByUserandArticleIdViewModel
    {
        public int Id { get; set; }
        public string UserID { get; set; }
        public int ArticleId { get; set; }
    }
}
