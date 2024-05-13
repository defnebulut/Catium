
using CleanArchitecture.Core.Features.Follows.Queries.GetFollowIdByFollowings;
using CleanArchitecture.Core.Features.Likes.Commands.CreateLike;
using CleanArchitecture.Core.Features.Likes.Commands.DeleteLike;
using CleanArchitecture.Core.Features.Likes.Queries.GetAllLikesByUserId;
using CleanArchitecture.Core.Features.Likes.Queries.GetLikeIdByUserandArticleId;
using CleanArchitecture.Core.Features.Products.Queries.GetProductById;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class LikeController : BaseApiController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await Mediator.Send(new GetAllLikesByUserIdQuery { UserId = id }));
        }
        [HttpGet]
        public async Task<IActionResult> Get(int articleId, string userId)
        {
            return Ok(await Mediator.Send(new GetLikeIdByUserandArticleIdQuery { UserID = userId, ArticleId = articleId }));
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(CreateLikeCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteLikeCommand { Id = id }));
        }
    }
}
