
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByUserId;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class UserArticleController : BaseApiController
    {
       
        
            [HttpGet]
            [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllArticlesByUserIdViewModel>>))]
            public async Task<PagedResponse<IEnumerable<GetAllArticlesByUserIdViewModel>>> Get(string id, [FromQuery] GetAllArticlesByUserIdParameter filter)
            {
                return await Mediator.Send(new GetAllArticlesByUserIdQuery() { UserId = id, PageSize = filter.PageSize, PageNumber = filter.PageNumber });
            }
        
    }
}
