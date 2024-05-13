using CleanArchitecture.Core.Features.Reports.Queries.GetAllCommentReports;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllUserReports;
using CleanArchitecture.Core.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers.v1
{

    [ApiVersion("1.0")]
    public class ReportUserController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllUserReportsViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllUserReportsViewModel>>> Get(int id, [FromQuery] GetAllUserReportsParameter filter)
        {
            return await Mediator.Send(new GetAllUserReportsQuery() { Report_Type = id, PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }

    }
}
