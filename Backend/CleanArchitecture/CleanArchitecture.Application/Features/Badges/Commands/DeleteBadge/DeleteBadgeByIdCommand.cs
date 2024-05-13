using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Badges.Commands.DeleteBadge
{
    public class DeleteBadgeByIdCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }

        public class DeleteBadgeByIdCommandHandler : IRequestHandler<DeleteBadgeByIdCommand, Response<int>>
        {
            private readonly IBadgeRepositoryAsync _badgeRepository;

            public DeleteBadgeByIdCommandHandler(IBadgeRepositoryAsync badgeRepository)
            {
                _badgeRepository = badgeRepository;
            }

            public async Task<Response<int>> Handle(DeleteBadgeByIdCommand request, CancellationToken cancellationToken)
            {
                var badge = await _badgeRepository.GetByIdAsync(request.Id);
                if (badge == null) throw new ApiException($"Badge Not Found.");
                await _badgeRepository.DeleteAsync(badge);
                return new Response<int>(badge.Id);
            }
        }
    }
}
