
using CleanArchitecture.Core.Features.Users.Commands.DeleteUserCommand;
using CleanArchitecture.Core.Features.Users.Commands.UpdateUser;
using CleanArchitecture.Core.Features.Users.Query.GetAllUsers;
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
    public class UserController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllUsersViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllUsersViewModel>>> Get([FromQuery] GetAllUsersParameter filter)
        {
            return await Mediator.Send(new GetAllUsersQuery() { PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await Mediator.Send(new GetUserByIdQuery { UserId = id }));
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Moderator, Admin, Superadmin")]
        public async Task<IActionResult> Delete(string id)
        {
            return Ok(await Mediator.Send(new DeleteUserByIdCommand { UserId = id }));
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(string id, UpdateUserCommand command)
        {
            if (id != command.UserId)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }
    }
}
