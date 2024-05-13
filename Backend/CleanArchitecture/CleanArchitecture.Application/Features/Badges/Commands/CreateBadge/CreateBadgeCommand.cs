using AutoMapper;
using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Badges.Commands.CreateBadge
{
    public class CreateBadgeCommand : IRequest<Response<int>>
    {
        public string BadgeImage { get; set; }
        public string BadgeTitle { get; set; }

        public class CreateBadgeCommandHandler : IRequestHandler<CreateBadgeCommand, Response<int>>
        {
            private readonly IBadgeRepositoryAsync _badgerepository;
            private readonly IMapper _mapper;

            public CreateBadgeCommandHandler(IBadgeRepositoryAsync repository, IMapper mapper)
            {
                _badgerepository = repository;
                _mapper = mapper;
            }

            public async Task<Response<int>> Handle(CreateBadgeCommand request, CancellationToken cancellationToken)
            {
                var badge = _mapper.Map<Badge>(request);
                await _badgerepository.AddAsync(badge);
                return new Response<int>(badge.Id);
            }
        }
    }
   
}
