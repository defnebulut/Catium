using AutoMapper;
using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace CleanArchitecture.Core.Features.Follows.Commands.CreateFollow
{
    public partial class CreateFollowCommand : IRequest<Response<int>>
    {
        public string UserFollowsId { get; set; }
        public string UserFollowedId { get; set; }

        public class CreateFollowCommandHandler : IRequestHandler<CreateFollowCommand, Response<int>>
        {
            private readonly IFollowRepositoryAsync _followRepositoryAsync;
            private readonly IUserRepositoryAsync _userRepositoryAsync;
            private readonly IMapper _mapper;

            public CreateFollowCommandHandler(IFollowRepositoryAsync followRepositoryAsync, IUserRepositoryAsync userRepositoryAsync, IMapper mapper)
            {

                _followRepositoryAsync = followRepositoryAsync;
                _userRepositoryAsync = userRepositoryAsync;
                _mapper = mapper;
            }


            public async Task<Response<int>> Handle(CreateFollowCommand request, CancellationToken cancellationToken)
            {
                var follow = _mapper.Map<Follow>(request);
                var user1 = await _userRepositoryAsync.GetByIdAsync(request.UserFollowsId);
                if (user1 == null) throw new EntityNotFoundException("user", request.UserFollowsId);
                var user2 = await _userRepositoryAsync.GetByIdAsync(request.UserFollowedId);
                if (user2 == null) throw new EntityNotFoundException("user", request.UserFollowedId);

                await _followRepositoryAsync.AddAsync(follow);

                return new Response<int>(follow.Id);
            }
        }
    }


}
