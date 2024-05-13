using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Likes.Queries.GetLikeIdByUserandArticleId
{
    public class GetLikeIdByUserandArticleIdQuery : IRequest<Response<GetLikeIdByUserandArticleIdViewModel>>
    {
        public string UserID { get; set; }
        public int ArticleId { get; set; }

        public class GetLikeIdByUserandArticleIdQueryHandler : IRequestHandler<GetLikeIdByUserandArticleIdQuery, Response<GetLikeIdByUserandArticleIdViewModel>>
        {
            private readonly ILikeRepositoryAsync _likeRepository;
            private readonly IUserRepositoryAsync _userRepository;
            private readonly IArticleRepositoryAsync _articleRepository;

            public GetLikeIdByUserandArticleIdQueryHandler(ILikeRepositoryAsync likeRepository, IUserRepositoryAsync userRepository, IArticleRepositoryAsync articleRepository)
            {
                _likeRepository = likeRepository;
                _userRepository = userRepository;
                _articleRepository = articleRepository;
            }

            public async Task<Response<GetLikeIdByUserandArticleIdViewModel>> Handle(GetLikeIdByUserandArticleIdQuery request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetByIdAsync(request.UserID);
                if (user == null) throw new ApiException($"User Not Found.");
                var article = await _articleRepository.GetByIdAsync(request.ArticleId);
                if (article == null) throw new ApiException($"Article Not Found.");
                var like = await _likeRepository.GetLikeByIdByUserandArticleId(request.ArticleId, request.UserID);
                if (like == null) throw new ApiException($"Like Not Found.");
                return new Response<GetLikeIdByUserandArticleIdViewModel>(like);
                

                
            }
        }
    }
}
