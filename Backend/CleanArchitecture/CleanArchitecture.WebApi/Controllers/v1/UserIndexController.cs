
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using CleanArchitecture.Core.Features.Users.Query.GetUsersByUsername;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class UserIndexController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetUsersByUsernameViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetUsersByUsernameViewModel>>> Get(string index, [FromQuery] GetUsersByUsernameParameter filter)
        {
            return await Mediator.Send(new GetUsersByUsernameQuery() { Index = index, PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }
    }
}
