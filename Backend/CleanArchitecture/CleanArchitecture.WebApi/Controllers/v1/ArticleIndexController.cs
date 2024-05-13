﻿using CleanArchitecture.Core.Features.Products.Queries.GetAllArticleByName;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByName;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByUserId;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class ArticleIndexController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllArticlesByNameViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllArticlesByNameViewModel>>> Get(string index, [FromQuery] GetAllArticlesByNameParameter filter)
        {
            return await Mediator.Send(new GetAllArticlesByNameQuery() { Index = index, PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }
    }
}