using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Likes.Queries.GetAllLikesByUserId
{
    public class GetAllLikesByUserIdQuery : IRequest<Response<int>>
    {
        public string UserId { get; set; }

        public class GetAllLikesByUserIdQueryHandler : IRequestHandler<GetAllLikesByUserIdQuery, Response<int>>
        {
            private readonly IUserRepositoryAsync _userRepositoryAsync;
            private readonly ILikeRepositoryAsync _likeRepositoryAsync;
            private readonly IArticleRepositoryAsync _articleRepositoryAsync;

            public GetAllLikesByUserIdQueryHandler(IUserRepositoryAsync userRepositoryAsync, ILikeRepositoryAsync likeRepositoryAsync, IArticleRepositoryAsync articleRepositoryAsync)
            {
                _userRepositoryAsync = userRepositoryAsync;
                _likeRepositoryAsync = likeRepositoryAsync;
                _articleRepositoryAsync = articleRepositoryAsync;
            }

            public async Task<Response<int>> Handle(GetAllLikesByUserIdQuery request, CancellationToken cancellationToken)
            {
                var user = await _userRepositoryAsync.GetUserById(request.UserId);
                if (user == null) throw new ApiException($"User Not Found.");
                var articles = await _articleRepositoryAsync.GetArticlesByUser(request.UserId);
                var total = 0;
                foreach (var article in articles)
                {

                    total += await _likeRepositoryAsync.GetTotalLikeByUserArticles(article.Id);

                }

                return new Response<int>(total);
            }
        }
    }

    
}
