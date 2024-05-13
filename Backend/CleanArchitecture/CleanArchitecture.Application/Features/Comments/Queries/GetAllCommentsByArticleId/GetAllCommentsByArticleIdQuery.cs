using AutoMapper;
using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Comments.Queries.GetAllCommentsByArticleId
{
    public class GetAllCommentsByArticleIdQuery : IRequest<PagedResponse<IEnumerable<GetAllCommentsByArticleIdViewModel>>>
    {
        public int Id { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllCommentsByArticleIdQueryHandler : IRequestHandler<GetAllCommentsByArticleIdQuery, PagedResponse<IEnumerable<GetAllCommentsByArticleIdViewModel>>>
        {
            private readonly IArticleRepositoryAsync _articleRepositoryAsync;
            private readonly ICommentRepositoryAsync _commentRepositoryAsync;
            private readonly IMapper _mapper;

            public GetAllCommentsByArticleIdQueryHandler(IArticleRepositoryAsync articleRepositoryAsync, ICommentRepositoryAsync commentRepositoryAsync, IMapper mapper)
            {
                _articleRepositoryAsync = articleRepositoryAsync;
                _commentRepositoryAsync = commentRepositoryAsync;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllCommentsByArticleIdViewModel>>> Handle(GetAllCommentsByArticleIdQuery request, CancellationToken cancellationToken)
            {
                var article = await _articleRepositoryAsync.GetByIdAsync(request.Id);
                if (article == null) throw new ApiException($"Article Not Found.");
                var valid = _mapper.Map<GetAllCommentsByArticleIdParameter>(request);
                var comments = await _commentRepositoryAsync.GetCommentsByArticle(request.Id);
                var commentArticle = _mapper.Map<IEnumerable<GetAllCommentsByArticleIdViewModel>>(comments);
                return new PagedResponse<IEnumerable<GetAllCommentsByArticleIdViewModel>>(commentArticle, valid.PageNumber, valid.PageSize);

            }
        }
    }
   
}
