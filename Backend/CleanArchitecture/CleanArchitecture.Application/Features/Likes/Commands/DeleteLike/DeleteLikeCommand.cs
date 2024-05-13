using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Likes.Commands.DeleteLike
{
    public class DeleteLikeCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }

        public class DeleteLikeCommandHandler : IRequestHandler<DeleteLikeCommand, Response<int>>
        {
            private readonly ILikeRepositoryAsync _likeRepository;

            public DeleteLikeCommandHandler(ILikeRepositoryAsync likeRepository)
            {
                _likeRepository = likeRepository;
            }
            public async Task<Response<int>> Handle(DeleteLikeCommand request, CancellationToken cancellationToken)
            {
                var like = await _likeRepository.GetByIdAsync(request.Id);
                if (like == null) throw new ApiException($"Like Not Found.");
                await _likeRepository.DeleteAsync(like);
                return new Response<int>(like.Id);
            }
        }
    }
   
}
