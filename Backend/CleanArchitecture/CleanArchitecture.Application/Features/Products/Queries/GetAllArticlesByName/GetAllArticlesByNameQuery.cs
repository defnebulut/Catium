using AutoMapper;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByName;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByUserId;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Products.Queries.GetAllArticleByName
{
    public class GetAllArticlesByNameQuery : IRequest<PagedResponse<IEnumerable<GetAllArticlesByNameViewModel>>>
    {
        public string Index { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllArticlesByNameQueryHandler : IRequestHandler<GetAllArticlesByNameQuery, PagedResponse<IEnumerable<GetAllArticlesByNameViewModel>>>
        {
            private readonly IArticleRepositoryAsync _articleRepositoryAsync;
            private readonly IMapper _mapper;

            public GetAllArticlesByNameQueryHandler(IArticleRepositoryAsync articleRepositoryAsync,IMapper mapper)
            {
                _articleRepositoryAsync = articleRepositoryAsync;
                _mapper = mapper;
            }


            public async Task<PagedResponse<IEnumerable<GetAllArticlesByNameViewModel>>> Handle(GetAllArticlesByNameQuery request, CancellationToken cancellationToken)
            {
                var valid = _mapper.Map<GetAllArticlesByNameParameter>(request);
                var articles = await _articleRepositoryAsync.GetAllArticlesByNameAsync(request.Index);
                var articleTitle = _mapper.Map<IEnumerable<GetAllArticlesByNameViewModel>>(articles);

                return new PagedResponse<IEnumerable<GetAllArticlesByNameViewModel>>(articleTitle, valid.PageNumber, valid.PageSize);

            }
        }
    }
}
