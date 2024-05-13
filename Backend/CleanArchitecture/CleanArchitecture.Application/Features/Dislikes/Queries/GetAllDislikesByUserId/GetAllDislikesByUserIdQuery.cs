using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Dislikes.Queries.GetAllDislikesByUserId
{
    public class GetAllDislikesByUserIdQuery : IRequest<Response<int>>
    {
        public string UserId { get; set; }

        public class GetAllDislikesByUserIdQueryHandler : IRequestHandler<GetAllDislikesByUserIdQuery, Response<int>>
        {
            private readonly IUserRepositoryAsync _userRepository;
            private readonly IDislikeRepositoryAsync _dislikeRepository;
            private readonly IArticleRepositoryAsync _articleRepository;

            public GetAllDislikesByUserIdQueryHandler(IUserRepositoryAsync userRepository, IDislikeRepositoryAsync dislikeRepository, IArticleRepositoryAsync articleRepository)
            {
                _userRepository = userRepository;
                _dislikeRepository = dislikeRepository;
                _articleRepository = articleRepository;
            }

            public async Task<Response<int>> Handle(GetAllDislikesByUserIdQuery request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetUserById(request.UserId);
                if (user == null) throw new ApiException($"User Not Found.");
                var articles = await _articleRepository.GetArticlesByUser(request.UserId);
                var total = 0;
                foreach (var article in articles)
                {

                    total += await _dislikeRepository.GetTotalDislikeByUserArticles(article.Id);

                }

                return new Response<int>(total);
            }
        }
    }

    
}
