using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Entities
{
    public class Save : BaseEntity
    {
        public string UserID { get; set; }
        public int ArticleId { get; set; }
    }
}
