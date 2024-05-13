using CleanArchitecture.Core.Features.Follows.Queries.GetAllFollowersByUserId;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class FollowerListController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllFollowersByUserIdViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllFollowersByUserIdViewModel>>> Get(string id, [FromQuery] GetAllFollowersByUserIdParameter filter)
        {
            return await Mediator.Send(new GetAllFollowersByUserIdQuery() { UserId = id, PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }
    }
}
