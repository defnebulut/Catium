using AutoMapper;
using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Features.Products.Commands.CreateProduct;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Categories.Commands.CreateCategory
{
    public partial class CreateCategoryCommand : IRequest<Response<int>>
    {
        public int ParentId { get; set; }
        public string Name { get; set; }

        public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, Response<int>>
        {
            private readonly ICategoryRepositoryAsync _categoryRepository;
            private readonly IMapper _mapper;

            public CreateCategoryCommandHandler(ICategoryRepositoryAsync categoryRepository, IMapper mapper)
            {
                _mapper = mapper;
                _categoryRepository = categoryRepository;
            }
            public async Task<Response<int>> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
            {
                var category = _mapper.Map<Category>(request);
                if (category == null) throw new EntityNotFoundException("category", request);
                await _categoryRepository.AddAsync(category);
                return new Response<int>(category.Id);
            }
        }
    }
   
}
