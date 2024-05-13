using AutoMapper;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Reports.Queries.GetAllCommentReports
{
    public class GetAllCommentReportsQuery : IRequest<PagedResponse<IEnumerable<GetAllCommentReportsViewModel>>>
    {
        public int Report_Type { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllCommentReportsQueryHnadler : IRequestHandler<GetAllCommentReportsQuery, PagedResponse<IEnumerable<GetAllCommentReportsViewModel>>>
        {
            private readonly IReportRepositoryAsync _reportRepository;
            private readonly IMapper _mapper;

            public GetAllCommentReportsQueryHnadler(IReportRepositoryAsync reportRepository, IMapper mapper)
            {
                _reportRepository = reportRepository;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllCommentReportsViewModel>>> Handle(GetAllCommentReportsQuery request, CancellationToken cancellationToken)
            {
                var valid = _mapper.Map<GetAllCommentReportsParameter>(request);
                var reports = await _reportRepository.GetCommentReports(request.Report_Type);
                var commentreports = _mapper.Map<IEnumerable<GetAllCommentReportsViewModel>>(reports);
                return new PagedResponse<IEnumerable<GetAllCommentReportsViewModel>>(commentreports, valid.PageNumber,valid.PageSize);
            }
        }
    }
}
