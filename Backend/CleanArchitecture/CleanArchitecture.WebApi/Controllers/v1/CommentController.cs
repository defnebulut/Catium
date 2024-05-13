using CleanArchitecture.Core.Features.Categories.Queries.GetAllCategories;
using CleanArchitecture.Core.Features.Comments.Commands.CreateCommand;
using CleanArchitecture.Core.Features.Comments.Commands.DeleteComment;
using CleanArchitecture.Core.Features.Comments.Commands.UpdateComment;
using CleanArchitecture.Core.Features.Comments.Queries.GetAllCommentsByArticleId;
using CleanArchitecture.Core.Features.Comments.Queries.GetCommentByCommentId;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByCategoryId;
using CleanArchitecture.Core.Features.Products.Queries.GetProductById;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class CommentController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllCommentsByArticleIdViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllCommentsByArticleIdViewModel>>> Get(int id, [FromQuery] GetAllCommentsByArticleIdParameter filter)
        {
            return await Mediator.Send(new GetAllCommentsByArticleIdQuery() { Id = id, PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await Mediator.Send(new GetCommentByCommentIdQuery { Id = id }));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(CreateCommentCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteCommentCommand { Id = id }));
        }
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, UpdateCommentCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }
    }
}
