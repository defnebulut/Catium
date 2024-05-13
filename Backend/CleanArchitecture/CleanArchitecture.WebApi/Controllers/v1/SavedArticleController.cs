using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesSavedByUser;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class SavedArticleController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllArticlesSavedByUserViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllArticlesSavedByUserViewModel>>> Get(string id, [FromQuery] GetAllArticlesSavedByUserParameter filter)
        {
            return await Mediator.Send(new GetAllArticlesSavedByUserQuery() { UserId = id, PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }
    }
}
