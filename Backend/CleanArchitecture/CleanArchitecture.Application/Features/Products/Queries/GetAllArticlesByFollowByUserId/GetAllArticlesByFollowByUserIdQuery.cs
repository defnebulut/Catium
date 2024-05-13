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

namespace CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByFollowByUserId
{
    public class GetAllArticlesByFollowByUserIdQuery : IRequest<PagedResponse<IEnumerable<GetAllArticlesByFollowByUserIdViewModel>>>
    {
        public string UserId { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllArticlesByFollowByUserIdQueryHandler : IRequestHandler<GetAllArticlesByFollowByUserIdQuery, PagedResponse<IEnumerable<GetAllArticlesByFollowByUserIdViewModel>>>
        {
            private readonly IFollowRepositoryAsync _followRepository;
            private readonly IUserRepositoryAsync _userRepository;
            private readonly IMapper _mapper;
            private readonly IArticleRepositoryAsync _articleRepository;

            public GetAllArticlesByFollowByUserIdQueryHandler(IFollowRepositoryAsync followRepository, IUserRepositoryAsync userRepository, IMapper mapper, IArticleRepositoryAsync articleRepository)
            {
                _followRepository = followRepository;
                _userRepository = userRepository;
                _mapper = mapper;
                _articleRepository = articleRepository;
            }

            public async Task<PagedResponse<IEnumerable<GetAllArticlesByFollowByUserIdViewModel>>> Handle(GetAllArticlesByFollowByUserIdQuery request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetByIdAsync(request.UserId);
                if (user == null) throw new ApiException($"User Not Found.");
                var valid = _mapper.Map<GetAllArticlesByFollowByUserIdParameter>(request);
                var article = await _articleRepository.GetArticlesByFollowers(request.UserId);
                var articlefollowlist = _mapper.Map<IEnumerable<GetAllArticlesByFollowByUserIdViewModel>>(article);

                return new PagedResponse<IEnumerable<GetAllArticlesByFollowByUserIdViewModel>>(articlefollowlist,valid.PageNumber,valid.PageSize);
                

                
                
            }
        }
    }
}
