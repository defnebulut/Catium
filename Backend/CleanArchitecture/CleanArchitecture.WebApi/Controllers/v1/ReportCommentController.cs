using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesSavedByUser;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllCommentReports;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class ReportCommentController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllCommentReportsViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllCommentReportsViewModel>>> Get(int id, [FromQuery] GetAllCommentReportsParameter filter)
        {
            return await Mediator.Send(new GetAllCommentReportsQuery() { Report_Type = id, PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }
    }
}
