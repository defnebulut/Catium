using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Saves.Queries.GetSaveIdByUserandArticleId
{
    public class GetSaveIdByUserandArticleIdQuery : IRequest<Response<GetSaveIdByUserandArticleIdViewModel>>
    {
        public string UserID { get; set; }
        public int ArticleId { get; set; }

        public class GetSaveIdByUserandArticleIdQueryHandler : IRequestHandler<GetSaveIdByUserandArticleIdQuery, Response<GetSaveIdByUserandArticleIdViewModel>>
        {
            private readonly ISaveRepositoryAsync _saveRepository;
            private readonly IUserRepositoryAsync _userRepository;
            private readonly IArticleRepositoryAsync _articleRepository;

            public GetSaveIdByUserandArticleIdQueryHandler(ISaveRepositoryAsync saveRepository, IUserRepositoryAsync userRepository, IArticleRepositoryAsync articleRepository)
            {
                _saveRepository = saveRepository;
                _userRepository = userRepository;
                _articleRepository = articleRepository;
            }

            public async Task<Response<GetSaveIdByUserandArticleIdViewModel>> Handle(GetSaveIdByUserandArticleIdQuery request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetByIdAsync(request.UserID);
                if (user == null) throw new ApiException($"User Not Found.");
                var article = await _articleRepository.GetByIdAsync(request.ArticleId);
                if (article == null) throw new ApiException($"Article Not Found.");
                var save = await _saveRepository.GetSaveByIdByUserandArticleId(request.ArticleId,request.UserID);
                if (save == null) throw new ApiException($"Save Not Found.");
                return new Response<GetSaveIdByUserandArticleIdViewModel>(save);
            }
        }
    }
}
