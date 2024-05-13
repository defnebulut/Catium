using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Comments.Commands.UpdateComment
{
    public class UpdateCommentCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public string UserID { get; set; }
        public int ArticleId { get; set; }
        public string Comment_Text { get; set; }

        public class UpdateCommentCommandHandler : IRequestHandler<UpdateCommentCommand, Response<int>>
        {
            private readonly ICommentRepositoryAsync _commentRepositoryAsync;
            private readonly IUserRepositoryAsync _userRepositoryAsync;
            private readonly IArticleRepositoryAsync _articleRepositoryAsync;

            public UpdateCommentCommandHandler(ICommentRepositoryAsync commentRepositoryAsync, IUserRepositoryAsync userRepositoryAsync, IArticleRepositoryAsync articleRepositoryAsync)
            {
                _commentRepositoryAsync = commentRepositoryAsync;
                _userRepositoryAsync = userRepositoryAsync;
                _articleRepositoryAsync = articleRepositoryAsync;
            }

            public async Task<Response<int>> Handle(UpdateCommentCommand request, CancellationToken cancellationToken)
            {
                var user = await _userRepositoryAsync.GetByIdAsync(request.UserID);
                if (user == null) throw new EntityNotFoundException("user", request.Id);
                var article = await _articleRepositoryAsync.GetByIdAsync(request.ArticleId);
                if (article == null) throw new EntityNotFoundException("article", request.Id);
                var comment = await _commentRepositoryAsync.GetByIdAsync(request.Id);
                if (comment == null) throw new EntityNotFoundException("comment", request.Id);

                comment.Comment_Text = request.Comment_Text;

                await _commentRepositoryAsync.UpdateAsync(comment);

                return new Response<int>(comment.Id);


            }
        }
    }
   
}
