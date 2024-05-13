using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Features.Comments.Queries.GetAllCommentsByArticleId
{
    public class GetAllCommentsByArticleIdViewModel
    {
        public int Id { get; set; }
        public string UserID { get; set; }
        public string Comment_Text { get; set; }
    }
}
