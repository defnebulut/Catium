using CleanArchitecture.Core.Features.Products.Commands.CreateProduct;
using CleanArchitecture.Core.Features.Products.Commands.DeleteProductById;
using CleanArchitecture.Core.Features.Products.Commands.UpdateProduct;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByCategoryId;
using CleanArchitecture.Core.Features.Products.Queries.GetAllProducts;
using CleanArchitecture.Core.Features.Products.Queries.GetProductById;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class ArticleController : BaseApiController
    {
        // GET: api/<controller>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllArticlesViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllArticlesViewModel>>> Get([FromQuery] GetAllArticlesParameter filter)
        {
            return await Mediator.Send(new GetAllArticlesQuery() { PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }



        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await Mediator.Send(new GetArticleByIdQuery { Id = id }));
        }



        // POST api/<controller>
        [HttpPost]
        [Authorize(Roles = "Basic")]
        public async Task<IActionResult> Post(CreateArticleCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, UpdateArticleCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteArticleByIdCommand { Id = id }));
        }
    }
}
