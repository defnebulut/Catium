using AutoMapper;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Reports.Queries.GetAllReports
{
    public class GetAllReportsQuery : IRequest<PagedResponse<IEnumerable<GetAllReportsViewModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllReportsQueryHandler : IRequestHandler<GetAllReportsQuery, PagedResponse<IEnumerable<GetAllReportsViewModel>>>
        {
            private readonly IReportRepositoryAsync _reportRepositoryAsync;
            private readonly IMapper _mapper;

            public GetAllReportsQueryHandler(IReportRepositoryAsync reportRepositoryAsync,IMapper mapper)
            {
                _reportRepositoryAsync = reportRepositoryAsync;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllReportsViewModel>>> Handle(GetAllReportsQuery request, CancellationToken cancellationToken)
            {
                var valid = _mapper.Map<GetAllReportsParameter>(request);
                var reports = await _reportRepositoryAsync.GetPagedReponseAsync(valid.PageNumber, valid.PageSize);
                var reportlist = _mapper.Map<IEnumerable<GetAllReportsViewModel>>(reports);
                return new PagedResponse<IEnumerable<GetAllReportsViewModel>>(reportlist, valid.PageNumber, valid.PageSize);
            }
        }
    }
}
