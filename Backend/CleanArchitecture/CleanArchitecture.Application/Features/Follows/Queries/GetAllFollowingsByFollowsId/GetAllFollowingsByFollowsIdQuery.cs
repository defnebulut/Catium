using AutoMapper;
using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Features.Follows.Queries.GetAllFollowingsByFollowsId;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Follows.Queries.GetFollowingsByFollowsId
{
    public class GetAllFollowingsByFollowsIdQuery : IRequest<PagedResponse<IEnumerable<GetAllFollowingsByFollowsIdViewModel>>>
    {
        public string UserId { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllFollowingsByFollowsIdQueryHandler : IRequestHandler<GetAllFollowingsByFollowsIdQuery, PagedResponse<IEnumerable<GetAllFollowingsByFollowsIdViewModel>>>
        {
            private readonly IFollowRepositoryAsync _followRepositoryAsync;
            private readonly IUserRepositoryAsync _userRepositoryAsync;
            private readonly IMapper _mapper;

            public GetAllFollowingsByFollowsIdQueryHandler(IFollowRepositoryAsync followRepositoryAsync, IUserRepositoryAsync userRepositoryAsync, IMapper mapper)
            {
                _followRepositoryAsync = followRepositoryAsync;
                _userRepositoryAsync = userRepositoryAsync;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllFollowingsByFollowsIdViewModel>>> Handle(GetAllFollowingsByFollowsIdQuery request, CancellationToken cancellationToken)
            {
                var user = await _userRepositoryAsync.GetByIdAsync(request.UserId);
                if (user == null) throw new ApiException($"User Not Found.");
                var valid = _mapper.Map<GetAllFollowingsByFollowsIdParameter>(request);
                var followeds = await _followRepositoryAsync.GetFollowedsByUserId(request.UserId);

                var followedlist = _mapper.Map<IEnumerable<GetAllFollowingsByFollowsIdViewModel>>(followeds);
                return new PagedResponse<IEnumerable<GetAllFollowingsByFollowsIdViewModel>> (followedlist,valid.PageNumber,valid.PageSize);

            }
        }
    }
}
