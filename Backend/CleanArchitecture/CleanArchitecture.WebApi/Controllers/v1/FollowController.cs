using CleanArchitecture.Core.Features.Categories.Commands.CreateCategory;
using CleanArchitecture.Core.Features.Follows.Commands.CreateFollow;
using CleanArchitecture.Core.Features.Follows.Commands.NewFolder;
using CleanArchitecture.Core.Features.Follows.Queries.GetAllFollowersByUserId;
using CleanArchitecture.Core.Features.Follows.Queries.GetFollowIdByFollowings;
using CleanArchitecture.Core.Features.Products.Commands.DeleteProductById;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByUserId;
using CleanArchitecture.Core.Features.Users.Query.GetUserById;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class FollowController : BaseApiController
    {
        

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(CreateFollowCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
        /*[HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteFollowCommand { Id = id }));
        }*/
        [HttpGet]
        public async Task<IActionResult> Get(string followsId,string followedId)
        {
            return Ok(await Mediator.Send(new GetFollowIdByFollowingsQuery { UserFollowsId = followsId, UserFollowedId = followedId }));
        }
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete(string followsId, string followedId)
        {
            return Ok(await Mediator.Send(new DeleteFollowCommand { UserFollowsId = followsId, UserFollowedId = followedId }));
        }
    }
}
