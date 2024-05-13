using AutoMapper;
using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Reports.Commands.CreateArticleReport
{
    public class CreateReportCommand : IRequest<Response<int>>
    {
        public int Report_Type { get; set; }
        public int ReportedIntId { get; set; }
        public string ReportedStringId { get; set; }
        public string Report_Reason { get; set; }

        public class CreateReportCommandHandler : IRequestHandler<CreateReportCommand, Response<int>>
        {
            private readonly IReportRepositoryAsync _reportRepository;
            private readonly IMapper _mapper;
            private readonly ICommentRepositoryAsync _commentRepository;
            private readonly IArticleRepositoryAsync _articleRepository;
            private readonly IUserRepositoryAsync _userRepository;

            public CreateReportCommandHandler(IReportRepositoryAsync reportRepository, IMapper mapper, ICommentRepositoryAsync commentRepositoryAsync
                ,IUserRepositoryAsync userRepositoryAsync, IArticleRepositoryAsync articleRepositoryAsync)
            {
                _reportRepository = reportRepository;
                _mapper = mapper;
                _commentRepository = commentRepositoryAsync;
                _articleRepository = articleRepositoryAsync;
                _userRepository = userRepositoryAsync;
            }

            public async Task<Response<int>> Handle(CreateReportCommand request, CancellationToken cancellationToken)
            {
                var report = _mapper.Map<Report>(request);
                if(request.Report_Type == 1)
                {
                    var user = await _articleRepository.GetByIdAsync(request.ReportedStringId);
                    if (user == null) throw new EntityNotFoundException("user", request.ReportedStringId);

                }
                else if(request.Report_Type == 2)
                {
                    var article = await _articleRepository.GetByIdAsync(request.ReportedIntId);
                    if (article == null) throw new EntityNotFoundException("article", request.ReportedIntId);
                }
                else if(report.Report_Type == 3)
                {
                    var comment = await _commentRepository.GetByIdAsync(request.ReportedIntId);
                    if (comment == null) throw new EntityNotFoundException("comment", request.ReportedIntId);
                }
                else
                {
                    throw new ApiException($"Invalid report type.");
                }
                await _reportRepository.AddAsync(report);
                return new Response<int>(report.Id);
            }
        }
    }
}
