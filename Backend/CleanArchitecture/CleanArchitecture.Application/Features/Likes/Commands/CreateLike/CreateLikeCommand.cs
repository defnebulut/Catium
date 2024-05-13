using AutoMapper;
using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Likes.Commands.CreateLike
{

    public partial class CreateLikeCommand : IRequest<Response<int>>
    {
        public string UserID { get; set; }
        public int ArticleId { get; set; }

        public class CreateLikeCommandHandler : IRequestHandler<CreateLikeCommand, Response<int>>
        {
            private readonly ILikeRepositoryAsync _likeRepository;
            private readonly IUserRepositoryAsync _userRepository;
            private readonly IArticleRepositoryAsync _articleRepository;
            private readonly IMapper _mapper;

            public CreateLikeCommandHandler(ILikeRepositoryAsync likeRepositoryAsync, IMapper mapper, IArticleRepositoryAsync articleRepositoryAsync, IUserRepositoryAsync userRepositoryAsync)
            {
                _likeRepository = likeRepositoryAsync;
                _mapper = mapper;
                _userRepository = userRepositoryAsync;
                _articleRepository = articleRepositoryAsync;
            }

            public async Task<Response<int>> Handle(CreateLikeCommand request, CancellationToken cancellationToken)
            {
                var like = _mapper.Map<Like>(request);

                var article = await _articleRepository.GetByIdAsync(request.ArticleId);
                if (article == null) throw new EntityNotFoundException("article", request.ArticleId);
                var user = await _userRepository.GetByIdAsync(request.UserID);
                if (user == null) throw new EntityNotFoundException("user", request.UserID);
                var check = await _likeRepository.CheckExistingLike(user.UserId, article.Id);
                if (check != null) throw new ApiException($"User already liked this article");


                await _likeRepository.AddAsync(like);

                return new Response<int>(like.Id);




            }
        }
    }

   



}
