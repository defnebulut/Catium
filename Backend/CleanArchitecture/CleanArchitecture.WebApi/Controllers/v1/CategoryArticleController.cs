using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByCategoryId;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class CategoryArticleController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllArticlesByCategoryIdViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllArticlesByCategoryIdViewModel>>> Get(int id,[FromQuery] GetAllArticlesByCategoryIdParameter filter)
        {
            return await Mediator.Send(new GetAllArticlesByCategoryIdQuery() {Id = id, PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }
    }
}
