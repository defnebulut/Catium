using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Features.Categories.Queries.GetAllCategories
{
    public class GetAllCategoriesViewModel
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
    }
}
