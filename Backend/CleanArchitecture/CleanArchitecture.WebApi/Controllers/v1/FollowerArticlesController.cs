using CleanArchitecture.Core.Features.Follows.Queries.GetAllFollowersByUserId;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByFollowByUserId;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class FollowerArticlesController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllArticlesByFollowByUserIdViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllArticlesByFollowByUserIdViewModel>>> Get(string id, [FromQuery] GetAllArticlesByFollowByUserIdParameter filter)
        {
            return await Mediator.Send(new GetAllArticlesByFollowByUserIdQuery() { UserId = id, PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }
    }
}
