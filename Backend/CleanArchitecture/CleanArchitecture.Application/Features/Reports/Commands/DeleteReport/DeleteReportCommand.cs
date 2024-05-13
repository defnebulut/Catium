using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Reports.Commands.DeleteReport
{
    public class DeleteReportCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }

        public class DeleteReportCommandHandler : IRequestHandler<DeleteReportCommand, Response<int>>
        {
            private readonly IReportRepositoryAsync _reportRepository;

            public DeleteReportCommandHandler(IReportRepositoryAsync reportRepository)
            {
                _reportRepository = reportRepository;
            }

            public async Task<Response<int>> Handle(DeleteReportCommand request, CancellationToken cancellationToken)
            {
                var report = await _reportRepository.GetByIdAsync(request.Id);
                if (report == null) throw new ApiException($"Report Not Found.");

                await _reportRepository.DeleteAsync(report);
                return new Response<int>(report.Id);
            }
        }
    }
}
