using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Features.Follows.Queries.GetAllFollowersByUserId
{
    public class GetAllFollowersByUserIdViewModel
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string PP { get; set; }
    }
}
