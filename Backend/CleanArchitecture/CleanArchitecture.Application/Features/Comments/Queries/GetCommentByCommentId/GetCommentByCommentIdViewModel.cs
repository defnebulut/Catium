using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Features.Comments.Queries.GetCommentByCommentId
{
    public class GetCommentByCommentIdViewModel
    {
        public string Created_AuthorId { get; set; }
        public int ArticleId { get; set; }
        public string Comment_Text { get; set; }
    }
}
