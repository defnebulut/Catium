using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Dislikes.Queries.GetDislikeIdByUserandArticleId
{
    public class GetDislikeIdByUserandArticleIdQuery : IRequest<Response<GetDislikeIdByUserandArticleIdViewModel>>
    {
        public string UserID { get; set; }
        public int ArticleId { get; set; }

        public class GetDislikeIdByUserandArticleIdQueryHandler : IRequestHandler<GetDislikeIdByUserandArticleIdQuery, Response<GetDislikeIdByUserandArticleIdViewModel>>
        {
            private readonly IDislikeRepositoryAsync _dislikeRepository;
            private readonly IUserRepositoryAsync _userRepository;
            private readonly IArticleRepositoryAsync _articleRepository;

            public GetDislikeIdByUserandArticleIdQueryHandler(IDislikeRepositoryAsync dislikeRepository, IUserRepositoryAsync userRepository, IArticleRepositoryAsync articleRepository)
            {
                _dislikeRepository = dislikeRepository;
                _userRepository = userRepository;
                _articleRepository = articleRepository;
            }

            public async Task<Response<GetDislikeIdByUserandArticleIdViewModel>> Handle(GetDislikeIdByUserandArticleIdQuery request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetByIdAsync(request.UserID);
                if (user == null) throw new ApiException($"User Not Found.");
                var article = await _articleRepository.GetByIdAsync(request.ArticleId);
                if (article == null) throw new ApiException($"Article Not Found.");
                var dislike = await _dislikeRepository.GetDislikeByIdByUserandArticleId(request.ArticleId,request.UserID);
                if(dislike == null) throw new ApiException($"Dislike Not Found.");
                return new Response<GetDislikeIdByUserandArticleIdViewModel>(dislike);
            }
        }
    }
}
