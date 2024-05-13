using AutoMapper;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Products.Queries.GetAllProducts
{
    public class GetAllArticlesQuery : IRequest<PagedResponse<IEnumerable<GetAllArticlesViewModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }


        public class GetAllArticlesQueryHandler : IRequestHandler<GetAllArticlesQuery, PagedResponse<IEnumerable<GetAllArticlesViewModel>>>
        {
            private readonly IArticleRepositoryAsync _productRepository;
            private readonly IMapper _mapper;
            public GetAllArticlesQueryHandler(IArticleRepositoryAsync productRepository, IMapper mapper)
            {
                _productRepository = productRepository;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllArticlesViewModel>>> Handle(GetAllArticlesQuery request, CancellationToken cancellationToken)
            {
                var validFilter = _mapper.Map<GetAllArticlesParameter>(request);
                var products = await _productRepository.GetAllArticlesList();
                var productViewModel = _mapper.Map<IEnumerable<GetAllArticlesViewModel>>(products);
                return new PagedResponse<IEnumerable<GetAllArticlesViewModel>>(productViewModel, validFilter.PageNumber, validFilter.PageSize);
            }
        }
    }
    
}
