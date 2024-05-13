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

namespace CleanArchitecture.Core.Features.Comments.Commands.CreateCommand
{
    public partial class CreateCommentCommand : IRequest<Response<int>>
    {
        public string UserID { get; set; }
        public int ArticleId { get; set; }
        public string Comment_Text { get; set; }

        public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, Response<int>>
        {
            private readonly IArticleRepositoryAsync _articleRepositoryAsync;
            private readonly ICommentRepositoryAsync _commentRepositoryAsync;
            private readonly IUserRepositoryAsync _userRepositoryAsync;
            private readonly IMapper _mapper;

            public CreateCommentCommandHandler(IArticleRepositoryAsync articleRepositoryAsync, ICommentRepositoryAsync commentRepositoryAsync, IUserRepositoryAsync userRepositoryAsync, IMapper mapper)
            {
                _articleRepositoryAsync = articleRepositoryAsync;
                _commentRepositoryAsync = commentRepositoryAsync;
                _userRepositoryAsync = userRepositoryAsync;
                _mapper = mapper;
            }

            public async Task<Response<int>> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
            {
                var user = await _userRepositoryAsync.GetByIdAsync(request.UserID);
                if (user == null) throw new EntityNotFoundException("user", request.UserID);
                var article = await _articleRepositoryAsync.GetByIdAsync(request.ArticleId);
                if (article == null) throw new EntityNotFoundException("article", request.ArticleId);
                var comment = _mapper.Map<Comment>(request);

                await _commentRepositoryAsync.AddAsync(comment);

                return new Response<int>(comment.Id);
            }
        }
    }

   
}
