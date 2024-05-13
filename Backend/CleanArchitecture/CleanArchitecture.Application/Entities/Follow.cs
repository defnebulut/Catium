using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Entities
{
    public class Follow : BaseEntity
    {
        public string UserFollowsId { get; set; }
        public string UserFollowedId { get; set; }

    }
}
