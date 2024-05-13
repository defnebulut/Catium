using CleanArchitecture.Core.Features.Badges.Commands.CreateBadge;
using CleanArchitecture.Core.Features.Badges.Commands.DeleteBadge;
using CleanArchitecture.Core.Features.Badges.Commands.UpdateBadge;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class BadgeController : BaseApiController
    {
        [HttpPost]
        
        public async Task<IActionResult> Post(CreateBadgeCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpPut("{id}")]
       
        public async Task<IActionResult> Put(int id, UpdateBadgeCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteBadgeByIdCommand { Id = id }));
        }
    }
}
