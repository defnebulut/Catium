using CleanArchitecture.Core.Features.Categories.Commands.CreateCategory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CleanArchitecture.Core.Features.Products.Queries.GetAllProducts;
using CleanArchitecture.Core.Wrappers;
using System.Collections.Generic;
using CleanArchitecture.Core.Features.Categories.Queries.GetAllCategories;
using CleanArchitecture.Core.Features.Products.Commands.UpdateProduct;
using CleanArchitecture.Core.Features.Categories.Commands.UpdateCategory;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class CategoryController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllCategoriesViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllCategoriesViewModel>>> Get([FromQuery] GetAllCategoriesParameter filter)
        {
            return await Mediator.Send(new GetAllCategoriesQuery() { PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }

        [HttpPost]
        public async Task<IActionResult> Post(CreateCategoryCommand command)
        {
                return Ok(await Mediator.Send(command));
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, UpdateCategoryCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }


    }
}
