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

namespace CleanArchitecture.Core.Features.Saves.Commands.CreateSave
{
    public partial class CreateSaveCommand : IRequest<Response<int>>
    {
        public string UserID { get; set; }
        public int ArticleId { get; set; }

        public class CreateSaveCommandHandler : IRequestHandler<CreateSaveCommand, Response<int>>
        {
            private readonly ISaveRepositoryAsync _saveRepository;
            private readonly IUserRepositoryAsync _userRepository;
            private readonly IArticleRepositoryAsync _articleRepository;
            private readonly IMapper _mapper;

            public CreateSaveCommandHandler(ISaveRepositoryAsync saveRepositoryAsync, IUserRepositoryAsync userRepositoryAsync, IArticleRepositoryAsync articleRepositoryAsync, IMapper mapper)
            {
                _saveRepository = saveRepositoryAsync;
                _userRepository = userRepositoryAsync;
                _articleRepository = articleRepositoryAsync;
                _mapper = mapper;
            }




            public async Task<Response<int>> Handle(CreateSaveCommand request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetByIdAsync(request.UserID);
                if (user == null) throw new EntityNotFoundException("user", request.UserID);
                var article = await _articleRepository.GetByIdAsync(request.ArticleId);
                if (article == null) throw new EntityNotFoundException("article", request.ArticleId);
                var check = await _saveRepository.CheckExistingSave(user.UserId, article.Id);
                if (check != null) throw new ApiException($"User already saved this article");
                var save = _mapper.Map<Save>(request);


                await _saveRepository.AddAsync(save);

                return new Response<int>(save.Id);
            }
        }
    }

   
}
