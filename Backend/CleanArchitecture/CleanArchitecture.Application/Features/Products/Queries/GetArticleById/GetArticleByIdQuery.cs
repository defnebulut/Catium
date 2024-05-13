using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using CleanArchitecture.Core.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Core.Features.Products.Queries.GetArticleById;

namespace CleanArchitecture.Core.Features.Products.Queries.GetProductById
{
    public class GetArticleByIdQuery : IRequest<Response<GetArticleByIdViewModel>>
    {
        public int Id { get; set; }
        public class GetArticleByIdQueryHandler : IRequestHandler<GetArticleByIdQuery, Response<GetArticleByIdViewModel>>
        {
            private readonly IArticleRepositoryAsync _productRepository;
            public GetArticleByIdQueryHandler(IArticleRepositoryAsync productRepository)
            {
                _productRepository = productRepository;
            }
            public async Task<Response<GetArticleByIdViewModel>> Handle(GetArticleByIdQuery query, CancellationToken cancellationToken)
            {
                var product = await _productRepository.GetArticleById(query.Id);
                if (product == null) throw new ApiException($"Product Not Found.");
                return new Response<GetArticleByIdViewModel>(product);
            }
        }
    }
}
