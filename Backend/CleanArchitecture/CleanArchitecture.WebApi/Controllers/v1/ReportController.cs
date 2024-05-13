using CleanArchitecture.Core.Features.Products.Queries.GetAllProducts;
using CleanArchitecture.Core.Features.Reports.Commands.CreateArticleReport;
using CleanArchitecture.Core.Features.Reports.Commands.DeleteReport;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllArticleReports;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllReports;
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
    public class ReportController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResponse<IEnumerable<GetAllReportsViewModel>>))]
        public async Task<PagedResponse<IEnumerable<GetAllReportsViewModel>>> Get([FromQuery] GetAllArticleReportsParameter filter)
        {
            return await Mediator.Send(new GetAllReportsQuery() { PageSize = filter.PageSize, PageNumber = filter.PageNumber });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(CreateReportCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Moderator, Admin, Superadmin")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteReportCommand { Id = id }));
        }
    }
}
