
using CleanArchitecture.Core.Features.Likes.Queries.GetLikeIdByUserandArticleId;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesSavedByUser;
using CleanArchitecture.Core.Features.Saves.Commands.CreateSave;
using CleanArchitecture.Core.Features.Saves.Commands.DeleteSave;
using CleanArchitecture.Core.Features.Saves.Queries.GetSaveIdByUserandArticleId;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class SaveController : BaseApiController
    {


        [HttpGet]
        public async Task<IActionResult> Get(int articleId, string userId)
        {
            return Ok(await Mediator.Send(new GetSaveIdByUserandArticleIdQuery { UserID = userId, ArticleId = articleId }));
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(CreateSaveCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteSaveByIdCommand { Id = id }));
        }
    }
}
