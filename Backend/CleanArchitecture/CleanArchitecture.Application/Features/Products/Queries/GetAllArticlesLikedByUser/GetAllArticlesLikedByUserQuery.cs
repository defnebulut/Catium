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

namespace CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesLikedByUser
{
    public class GetAllArticlesLikedByUserQuery : IRequest<PagedResponse<IEnumerable<GetAllArticlesLikedByUserViewModel>>>
    {
        public string UserId { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllArticlesLikedByUserQueryHandler : IRequestHandler<GetAllArticlesLikedByUserQuery, PagedResponse<IEnumerable<GetAllArticlesLikedByUserViewModel>>>
        {
            private readonly IArticleRepositoryAsync _articleRepositoryAsync;
            private readonly IUserRepositoryAsync _userRepositoryAsync;
            private readonly IMapper _mapper;

            public GetAllArticlesLikedByUserQueryHandler(IArticleRepositoryAsync articleRepositoryAsync, IUserRepositoryAsync userRepositoryAsync, IMapper mapper)
            {
                _articleRepositoryAsync = articleRepositoryAsync;
                _userRepositoryAsync = userRepositoryAsync;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllArticlesLikedByUserViewModel>>> Handle(GetAllArticlesLikedByUserQuery request, CancellationToken cancellationToken)
            {
                var user = await _userRepositoryAsync.GetByIdAsync(request.UserId);
                if (user == null) throw new ApiException($"User Not Found.");
                var valid = _mapper.Map<GetAllArticlesLikedByUserParameter>(request);
                var article = await _articleRepositoryAsync.GetArticlesLikedByUser(request.UserId);
                var articlelikes = _mapper.Map<IEnumerable<GetAllArticlesLikedByUserViewModel>>(article);
                return new PagedResponse<IEnumerable<GetAllArticlesLikedByUserViewModel>>(articlelikes,valid.PageNumber,valid.PageSize);

            }
        }
    }
}
