using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Products.Commands.UpdateProduct
{
    public class UpdateArticleCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string CoverPicture { get; set; }
        public string Content { get; set; }
        public class UpdateArticleCommandHandler : IRequestHandler<UpdateArticleCommand, Response<int>>
        {
            private readonly IArticleRepositoryAsync _productRepository;

            private readonly ICategoryRepositoryAsync _categoryRepository;
            public UpdateArticleCommandHandler(IArticleRepositoryAsync productRepository, ICategoryRepositoryAsync categoryRepository)
            {
                _productRepository = productRepository;
                _categoryRepository = categoryRepository;
            }
            public async Task<Response<int>> Handle(UpdateArticleCommand command, CancellationToken cancellationToken)
            {
                var product = await _productRepository.GetByIdAsync(command.Id);

                var category = await _categoryRepository.GetByIdAsync(Int32.Parse(command.Category));

                if (product == null) throw new EntityNotFoundException("product", command.Id);
                if (category == null) throw new EntityNotFoundException("category",category.Id);

               

                product.Title = command.Title;
                product.Category = category;
                product.CoverPicture = command.CoverPicture;
                product.Content = command.Content;


                await _productRepository.UpdateAsync(product);
                return new Response<int>(product.Id);
            }
        }
    }
}
