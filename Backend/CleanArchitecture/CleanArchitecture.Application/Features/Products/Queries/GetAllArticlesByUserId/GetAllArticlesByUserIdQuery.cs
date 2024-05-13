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

namespace CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByUserId
{
    public class GetAllArticlesByUserIdQuery : IRequest<PagedResponse<IEnumerable<GetAllArticlesByUserIdViewModel>>>
    {
        public string UserId { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllArticlesByUserIdQueryHandler : IRequestHandler<GetAllArticlesByUserIdQuery, PagedResponse<IEnumerable<GetAllArticlesByUserIdViewModel>>>
        {
            private readonly IUserRepositoryAsync _userRepositoryAsync;
            private readonly IArticleRepositoryAsync _articleRepositoryAsync;
            private readonly IMapper _mapper;

            public GetAllArticlesByUserIdQueryHandler(IUserRepositoryAsync userRepositoryAsync, IArticleRepositoryAsync articleRepositoryAsync, IMapper mapper)
            {
                _userRepositoryAsync = userRepositoryAsync;
                _articleRepositoryAsync = articleRepositoryAsync;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllArticlesByUserIdViewModel>>> Handle(GetAllArticlesByUserIdQuery request, CancellationToken cancellationToken)
            {
                var user = await _userRepositoryAsync.GetByIdAsync(request.UserId);
                if (user == null) throw new ApiException($"User Not Found.");
                var valid = _mapper.Map<GetAllArticlesByUserIdParameter>(request);
                var articles = await _articleRepositoryAsync.GetArticlesByUserViewModel(request.UserId);
                var articleUser = _mapper.Map<IEnumerable<GetAllArticlesByUserIdViewModel>>(articles);

                return new PagedResponse<IEnumerable<GetAllArticlesByUserIdViewModel>>(articleUser, valid.PageNumber, valid.PageSize);
            }
        }

    }
    
}
