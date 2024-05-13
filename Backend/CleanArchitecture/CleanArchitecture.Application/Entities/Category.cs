using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Entities
{
    public class Category : BaseEntity
    {
        public Category Parent { get;set; }
        public string Name { get; set; }
        
    }
}
