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

namespace CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByCategoryId
{
    public class GetAllArticlesByCategoryIdQuery : IRequest<PagedResponse<IEnumerable<GetAllArticlesByCategoryIdViewModel>>>
    {
        public int Id { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllArticlesByCategoryIdQueryHandler : IRequestHandler<GetAllArticlesByCategoryIdQuery, PagedResponse<IEnumerable<GetAllArticlesByCategoryIdViewModel>>>
        {
            private readonly ICategoryRepositoryAsync _categoryRepositoryAsync;
            private readonly IArticleRepositoryAsync _articleRepositoryAsync;
            private readonly IMapper _mapper;

            public GetAllArticlesByCategoryIdQueryHandler(ICategoryRepositoryAsync categoryRepositoryAsync, IArticleRepositoryAsync articleRepositoryAsync, IMapper mapper)
            {
                _categoryRepositoryAsync = categoryRepositoryAsync;
                _articleRepositoryAsync = articleRepositoryAsync;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllArticlesByCategoryIdViewModel>>> Handle(GetAllArticlesByCategoryIdQuery request, CancellationToken cancellationToken)
            {
                var category = await _categoryRepositoryAsync.GetByIdAsync(request.Id);
                if (category == null) throw new ApiException($"Category Not Found.");
                var valid = _mapper.Map<GetAllArticlesByCategoryIdParameter>(request);

                var articles = await _articleRepositoryAsync.GetArticlesByCategory(request.Id);
                var articleCat = _mapper.Map<IEnumerable<GetAllArticlesByCategoryIdViewModel>>(articles);
                return new PagedResponse<IEnumerable<GetAllArticlesByCategoryIdViewModel>>(articleCat, valid.PageNumber, valid.PageSize);


            }
        }
    }
    
}
