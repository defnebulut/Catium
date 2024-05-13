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

namespace CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesSavedByUser
{
    public class GetAllArticlesSavedByUserQuery : IRequest<PagedResponse<IEnumerable<GetAllArticlesSavedByUserViewModel>>>
    {
        public string UserId { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllArticlesSavedByUserQueryHandler : IRequestHandler<GetAllArticlesSavedByUserQuery, PagedResponse<IEnumerable<GetAllArticlesSavedByUserViewModel>>>
        {
            private readonly IUserRepositoryAsync _userRepositoryAsync;
            private readonly ISaveRepositoryAsync _saveRepositoryAsync;
            private readonly IArticleRepositoryAsync _articleRepositoryAsync;
            private readonly IMapper _mapper;

            public GetAllArticlesSavedByUserQueryHandler(IUserRepositoryAsync userRepositoryAsync, ISaveRepositoryAsync saveRepositoryAsync, IArticleRepositoryAsync articleRepositoryAsync, IMapper mapper)
            {
                _userRepositoryAsync = userRepositoryAsync;
                _saveRepositoryAsync = saveRepositoryAsync;
                _articleRepositoryAsync = articleRepositoryAsync;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllArticlesSavedByUserViewModel>>> Handle(GetAllArticlesSavedByUserQuery request, CancellationToken cancellationToken)
            {
                var user = await _userRepositoryAsync.GetByIdAsync(request.UserId);
                if (user == null) throw new ApiException($"User Not Found.");
                var valid = _mapper.Map<GetAllArticlesSavedByUserParameter>(request);
                var article = await _articleRepositoryAsync.GetArticlesBySavesByUser(request.UserId);
                var articlesaves = _mapper.Map<IEnumerable<GetAllArticlesSavedByUserViewModel>>(article);
                
                return new PagedResponse<IEnumerable<GetAllArticlesSavedByUserViewModel>>(articlesaves,valid.PageNumber,valid.PageSize);
            }
        }
    }
}
