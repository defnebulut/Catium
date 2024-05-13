using CleanArchitecture.Core.Features.Reports.Queries.GetAllArticleReports;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllCommentReports;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class ReportArticleController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllArticleReportsViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllArticleReportsViewModel>>> Get(int id, [FromQuery] GetAllArticleReportsParameter filter)
        {
            return await Mediator.Send(new GetAllArticleReportsQuery() { Report_Type = id, PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }
    }
}
