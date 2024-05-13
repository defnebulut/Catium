using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Entities
{
    public class Badge : BaseEntity
    {
        public string BadgeImage { get; set; }
        public string BadgeTitle { get; set;}
    }
}
