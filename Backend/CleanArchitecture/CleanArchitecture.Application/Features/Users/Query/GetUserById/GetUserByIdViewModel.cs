using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Features.Users.Query.GetUserById
{
    public class GetUserByIdViewModel
    {
        public string UserId { get; set;}

        public string UserName { get; set;}

        public string UserEmail { get; set;}
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Bio { get; set; }

        public string Pp { get; set; }



    }
}
