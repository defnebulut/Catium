using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Entities
{
    public class Comment : AuditableBaseEntity
    {
        public string UserID { get; set; }
        public int ArticleId { get; set; }
        public string Comment_Text { get; set; }
    }
}
