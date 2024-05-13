using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Follows.Queries.GetFollowIdByFollowings
{
    public class GetFollowIdByFollowingsQuery : IRequest<Response<GetFollowIdByFollowingViewModel>>
    {
        public string UserFollowsId { get; set; }
        public string UserFollowedId { get; set; }

        public class GetFollowIdByFollowingsQueryHandler : IRequestHandler<GetFollowIdByFollowingsQuery, Response<GetFollowIdByFollowingViewModel>>
        {

            private readonly IFollowRepositoryAsync _followRepository;
            public GetFollowIdByFollowingsQueryHandler(IFollowRepositoryAsync followRepositoryAsync)
            {
                _followRepository = followRepositoryAsync;
            }


            public async Task<Response<GetFollowIdByFollowingViewModel>> Handle(GetFollowIdByFollowingsQuery request, CancellationToken cancellationToken)
            {
                var follow = await _followRepository.GetFollowById(request.UserFollowsId,request.UserFollowedId);
                if (follow == null) throw new ApiException($"Following Not Found.");
                return new Response<GetFollowIdByFollowingViewModel>(follow);
            }
        }

    }
}
