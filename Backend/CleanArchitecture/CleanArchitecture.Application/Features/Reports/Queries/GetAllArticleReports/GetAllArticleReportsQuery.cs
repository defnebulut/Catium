using AutoMapper;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Reports.Queries.GetAllArticleReports
{
    public class GetAllArticleReportsQuery : IRequest<PagedResponse<IEnumerable<GetAllArticleReportsViewModel>>>
    {
        public int Report_Type { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllArticlesReportsQueryHandler : IRequestHandler<GetAllArticleReportsQuery, PagedResponse<IEnumerable<GetAllArticleReportsViewModel>>>
        {
            private readonly IReportRepositoryAsync _reportRepository;
            private readonly IMapper _mapper;

            public GetAllArticlesReportsQueryHandler(IReportRepositoryAsync reportRepository, IMapper mapper)
            {
                _reportRepository = reportRepository;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllArticleReportsViewModel>>> Handle(GetAllArticleReportsQuery request, CancellationToken cancellationToken)
            {
                var valid = _mapper.Map<GetAllArticleReportsParameter>(request);
                var reports = await _reportRepository.GetArticleReports(request.Report_Type);
                var articlereports = _mapper.Map<IEnumerable<GetAllArticleReportsViewModel>>(reports);
                return new PagedResponse<IEnumerable<GetAllArticleReportsViewModel>>(articlereports,valid.PageNumber, valid.PageSize);
            }
        }
    }
}
