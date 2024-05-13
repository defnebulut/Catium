using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Features.Follows.Queries.GetFollowIdByFollowings
{
    public class GetFollowIdByFollowingViewModel
    {
        public int Id { get; set; }
        public string UserFollowsId { get; set; }
        public string UserFollowedId { get; set; }

    }
}
