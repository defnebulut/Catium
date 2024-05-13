using AutoMapper;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using CleanArchitecture.Core.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System;
using CleanArchitecture.Core.Exceptions;

namespace CleanArchitecture.Core.Features.Products.Commands.CreateProduct
{
    public partial class CreateArticleCommand : IRequest<Response<int>>
    {
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public string CoverPicture { get; set; }
        public string Content { get; set; }

        public class CreateArticleCommandHandler : IRequestHandler<CreateArticleCommand, Response<int>>
        {
            private readonly IArticleRepositoryAsync _productRepository;
            private readonly ICategoryRepositoryAsync _categoryRepository;
            private readonly IMapper _mapper;
            public CreateArticleCommandHandler(IArticleRepositoryAsync productRepository, IMapper mapper, ICategoryRepositoryAsync categoryRepository)
            {
                _productRepository = productRepository;
                _mapper = mapper;
                _categoryRepository = categoryRepository;
            }

            public async Task<Response<int>> Handle(CreateArticleCommand request, CancellationToken cancellationToken)
            {
                var article = _mapper.Map<Article>(request);
                var category = await _categoryRepository.GetByIdAsync(request.CategoryId);
                if (category == null) throw new EntityNotFoundException("category", request.CategoryId);
                await _productRepository.AddAsync(article);

                article.Category = category;
               

                await _productRepository.UpdateAsync(article);
                return new Response<int>(article.Id);
            }
        }
    }
   
}
