using CleanArchitecture.Core.Features.Dislikes.Commands.CreateDislike;
using CleanArchitecture.Core.Features.Dislikes.Commands.DeleteDislike;
using CleanArchitecture.Core.Features.Dislikes.Queries.GetAllDislikesByUserId;
using CleanArchitecture.Core.Features.Dislikes.Queries.GetDislikeIdByUserandArticleId;
using CleanArchitecture.Core.Features.Likes.Queries.GetLikeIdByUserandArticleId;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class DislikeController : BaseApiController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await Mediator.Send(new GetAllDislikesByUserIdQuery { UserId = id }));
        }
        [HttpGet]
        public async Task<IActionResult> Get(int articleId, string userId)
        {
            return Ok(await Mediator.Send(new GetDislikeIdByUserandArticleIdQuery { UserID = userId, ArticleId = articleId }));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(CreateDislikeCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteDislikeCommand { Id = id }));
        }
    }
}
