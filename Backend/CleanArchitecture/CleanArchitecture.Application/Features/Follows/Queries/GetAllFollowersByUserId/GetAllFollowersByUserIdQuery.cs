using AutoMapper;
using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Follows.Queries.GetAllFollowersByUserId
{
    public class GetAllFollowersByUserIdQuery : IRequest<PagedResponse<IEnumerable<GetAllFollowersByUserIdViewModel>>>
    {
        public string UserId { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllFollowersByUserIdQueryHandler : IRequestHandler<GetAllFollowersByUserIdQuery, PagedResponse<IEnumerable<GetAllFollowersByUserIdViewModel>>>
        {
            private readonly IUserRepositoryAsync _userRepository;
            private readonly IFollowRepositoryAsync _followRepository;
            private readonly IMapper _mapper;

            public GetAllFollowersByUserIdQueryHandler(IUserRepositoryAsync userRepository, IFollowRepositoryAsync followRepository, IMapper mapper)
            {
                _userRepository = userRepository;
                _followRepository = followRepository;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllFollowersByUserIdViewModel>>> Handle(GetAllFollowersByUserIdQuery request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetByIdAsync(request.UserId);
                if (user == null) throw new ApiException($"User Not Found.");
                var valid = _mapper.Map<GetAllFollowersByUserIdParameter>(request);
                var followers = await _followRepository.GetFollowersByUserId(request.UserId);
                
                var followlist = _mapper.Map<IEnumerable<GetAllFollowersByUserIdViewModel>>(followers);
                return new PagedResponse<IEnumerable<GetAllFollowersByUserIdViewModel>>(followlist, valid.PageNumber, valid.PageSize);
            }
        }
    }

   
}
