using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, Response<int>>
        {
            private readonly ICategoryRepositoryAsync _categoryRepositoryAsync;

            public UpdateCategoryCommandHandler(ICategoryRepositoryAsync categoryRepositoryAsync)
            {
                _categoryRepositoryAsync = categoryRepositoryAsync;
            }
            public async Task<Response<int>> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
            {
                var category = await _categoryRepositoryAsync.GetByIdAsync(request.Id);
                if (category == null) throw new EntityNotFoundException("category", category.Id);

                category.Name = request.Name;
                await _categoryRepositoryAsync.UpdateAsync(category);
                return new Response<int>(category.Id);
            }
        }

    }
   
}
