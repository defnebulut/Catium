using AutoMapper;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Reports.Queries.GetAllUserReports
{
    public class GetAllUserReportsQuery : IRequest<PagedResponse<IEnumerable<GetAllUserReportsViewModel>>>
    {
        public int Report_Type { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllUserReportsQueryHandler : IRequestHandler<GetAllUserReportsQuery, PagedResponse<IEnumerable<GetAllUserReportsViewModel>>>
        {
            private readonly IReportRepositoryAsync _reportRepository;
            private readonly IMapper _mapper;

            public GetAllUserReportsQueryHandler(IReportRepositoryAsync reportRepository, IMapper mapper)
            {
                _reportRepository = reportRepository;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllUserReportsViewModel>>> Handle(GetAllUserReportsQuery request, CancellationToken cancellationToken)
            {
                var valid = _mapper.Map<GetAllUserReportsParameter>(request);
                var users = await _reportRepository.GetUserReports(request.Report_Type);
                var userreports = _mapper.Map<IEnumerable<GetAllUserReportsViewModel>>(users);
                return new PagedResponse<IEnumerable<GetAllUserReportsViewModel>>(userreports,valid.PageNumber,valid.PageSize);
            }
        }
    }
}
