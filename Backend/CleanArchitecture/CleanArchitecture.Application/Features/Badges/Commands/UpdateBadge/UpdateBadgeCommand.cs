using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Badges.Commands.UpdateBadge
{
    public class UpdateBadgeCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public string BadgeImage { get; set; }
        public string BadgeTitle { get; set; }

        public class UpdateBadgeCommandHandler : IRequestHandler<UpdateBadgeCommand, Response<int>>
        {
            private readonly IBadgeRepositoryAsync _badgeRepository;

            public UpdateBadgeCommandHandler(IBadgeRepositoryAsync badgeRepository)
            {
                _badgeRepository = badgeRepository;
            }

            public async Task<Response<int>> Handle(UpdateBadgeCommand request, CancellationToken cancellationToken)
            {
                var badge = await _badgeRepository.GetByIdAsync(request.Id);
                if (badge == null) throw new ApiException($"Badge Not Found.");

                badge.BadgeImage = request.BadgeImage;
                badge.BadgeTitle = request.BadgeTitle;

                await _badgeRepository.UpdateAsync(badge);

                return new Response<int>(badge.Id);
            }
        }
    }
}
