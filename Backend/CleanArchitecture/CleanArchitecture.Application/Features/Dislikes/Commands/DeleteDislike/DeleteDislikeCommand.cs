using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Dislikes.Commands.DeleteDislike
{
    public class DeleteDislikeCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }

        public class DeleteDislikeCommandHandler : IRequestHandler<DeleteDislikeCommand, Response<int>>
        {
            private readonly IDislikeRepositoryAsync _dislikerepository;

            public DeleteDislikeCommandHandler(IDislikeRepositoryAsync dislikerepository)
            {

                _dislikerepository = dislikerepository;
            }
            public async Task<Response<int>> Handle(DeleteDislikeCommand request, CancellationToken cancellationToken)
            {
                var dislike = await _dislikerepository.GetByIdAsync(request.Id);
                if (dislike == null) throw new ApiException($"Dislike Not Found.");
                await _dislikerepository.DeleteAsync(dislike);
                return new Response<int>(dislike.Id);
            }
        }
    }
   
}
