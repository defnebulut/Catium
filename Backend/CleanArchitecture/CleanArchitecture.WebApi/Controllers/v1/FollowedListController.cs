using CleanArchitecture.Core.Features.Follows.Queries.GetAllFollowersByUserId;
using CleanArchitecture.Core.Features.Follows.Queries.GetAllFollowingsByFollowsId;
using CleanArchitecture.Core.Features.Follows.Queries.GetFollowingsByFollowsId;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class FollowedListController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllFollowingsByFollowsIdViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllFollowingsByFollowsIdViewModel>>> Get(string id, [FromQuery] GetAllFollowingsByFollowsIdParameter filter)
        {
            return await Mediator.Send(new GetAllFollowingsByFollowsIdQuery() { UserId = id, PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }
    }
}
