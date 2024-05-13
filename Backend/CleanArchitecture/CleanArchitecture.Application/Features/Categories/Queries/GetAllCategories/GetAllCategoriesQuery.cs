using AutoMapper;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Categories.Queries.GetAllCategories
{
    public class GetAllCategoriesQuery : IRequest<PagedResponse<IEnumerable<GetAllCategoriesViewModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, PagedResponse<IEnumerable<GetAllCategoriesViewModel>>>
        {
            private readonly ICategoryRepositoryAsync _categoryRepositoryAsync;
            private readonly IMapper _mapper;

            public GetAllCategoriesQueryHandler(ICategoryRepositoryAsync categoryRepositoryAsync, IMapper mapper)
            {
                _categoryRepositoryAsync = categoryRepositoryAsync;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllCategoriesViewModel>>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
            {
                var valid = _mapper.Map<GetAllCategoriesParameter>(request);
                var category = await _categoryRepositoryAsync.GetPagedReponseAsync(valid.PageNumber, valid.PageSize);
                var categoryViewModel = _mapper.Map<IEnumerable<GetAllCategoriesViewModel>>(category);
                return new PagedResponse<IEnumerable<GetAllCategoriesViewModel>>(categoryViewModel, valid.PageNumber, valid.PageSize);
            }
        }
    }
  
}
