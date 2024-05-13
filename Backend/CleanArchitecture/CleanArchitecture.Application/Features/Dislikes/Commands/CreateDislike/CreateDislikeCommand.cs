using AutoMapper;
using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Features.Likes.Commands.CreateLike;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace CleanArchitecture.Core.Features.Dislikes.Commands.CreateDislike
{
    public partial class CreateDislikeCommand : IRequest<Response<int>>
    {
        public string UserID { get; set; }
        public int ArticleId { get; set; }

        public class CreateDislikeCommandHandler : IRequestHandler<CreateDislikeCommand, Response<int>>
        {
            private readonly IDislikeRepositoryAsync _dislikeRepositoryAsync;
            private readonly IUserRepositoryAsync _userRepository;
            private readonly IArticleRepositoryAsync _articleRepository;
            private readonly IMapper _mapper;

            public CreateDislikeCommandHandler(IDislikeRepositoryAsync dislikeRepositoryAsync, IMapper mapper, IArticleRepositoryAsync articleRepositoryAsync, IUserRepositoryAsync userRepositoryAsync)
            {
                _dislikeRepositoryAsync = dislikeRepositoryAsync;
                _mapper = mapper;
                _userRepository = userRepositoryAsync;
                _articleRepository = articleRepositoryAsync;
            }

            public async Task<Response<int>> Handle(CreateDislikeCommand request, CancellationToken cancellationToken)
            {
                var dislike = _mapper.Map<Dislike>(request);

                var article = await _articleRepository.GetByIdAsync(request.ArticleId);
                if (article == null) throw new EntityNotFoundException("article", request.ArticleId);
                var user = await _userRepository.GetByIdAsync(request.UserID);
                if (user == null) throw new EntityNotFoundException("user", request.UserID);
                var check = await _dislikeRepositoryAsync.CheckExistingDislike(user.UserId, article.Id);
                if (check != null) throw new ApiException($"User already disliked this article");

                await _dislikeRepositoryAsync.AddAsync(dislike);

                return new Response<int>(dislike.Id);




            }
        }
    }
   
}
