using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesLikedByUser;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesSavedByUser;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class LikedArticleController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllArticlesLikedByUserViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllArticlesLikedByUserViewModel>>> Get(string id, [FromQuery] GetAllArticlesLikedByUserParameter filter)
        {
            return await Mediator.Send(new GetAllArticlesLikedByUserQuery() { UserId = id, PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }
    }
}
