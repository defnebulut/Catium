using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Features.Users.Query.GetUserById;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;

namespace CleanArchitecture.Core.Features.Users.Commands.DeleteUserCommand
{
    public class DeleteUserByIdCommand : IRequest<Response<Guid>>
    {
        public string UserId { get; set; }

        public class DeleteUserByIdCommandHandler : IRequestHandler<DeleteUserByIdCommand, Response<Guid>>
        {
            private readonly IUserRepositoryAsync _userRepositoryAsync;
            private readonly IArticleRepositoryAsync _articleRepositoryAsync;
            private readonly ILikeRepositoryAsync _likeRepositoryAsync;
            private readonly IDislikeRepositoryAsync _dislikeRepositoryAsync;
            private readonly ISaveRepositoryAsync _saveRepositoryAsync;
            private readonly ICommentRepositoryAsync _commentRepositoryAsync;
            private readonly IFollowRepositoryAsync _followRepositoryAsync;
            private readonly IReportRepositoryAsync _reportRepositoryAsync;
            

            public DeleteUserByIdCommandHandler(IUserRepositoryAsync userRepositoryAsync, IArticleRepositoryAsync articleRepositoryAsync, ILikeRepositoryAsync likeRepositoryAsync, IDislikeRepositoryAsync dislikeRepositoryAsync, ISaveRepositoryAsync saveRepositoryAsync, ICommentRepositoryAsync commentRepositoryAsync,IFollowRepositoryAsync followRepositoryAsync,IReportRepositoryAsync reportRepositoryAsync)
            {
                _userRepositoryAsync = userRepositoryAsync;
                _articleRepositoryAsync = articleRepositoryAsync;
                _likeRepositoryAsync = likeRepositoryAsync;
                _dislikeRepositoryAsync = dislikeRepositoryAsync;
                _saveRepositoryAsync = saveRepositoryAsync;
                _commentRepositoryAsync = commentRepositoryAsync;
                _followRepositoryAsync = followRepositoryAsync;
                _reportRepositoryAsync = reportRepositoryAsync;
            }

            public async Task<Response<Guid>> Handle(DeleteUserByIdCommand request, CancellationToken cancellationToken)
            {
                var user = await _userRepositoryAsync.GetByIdAsync(request.UserId);
                if (user == null) throw new ApiException($"User Not Found.");
                var articles = await _articleRepositoryAsync.GetArticlesByUser(request.UserId);

                foreach (var article in articles)
                {

                    await _likeRepositoryAsync.DeleteLikesByAritcleID(article.Id);
                    await _dislikeRepositoryAsync.DeleteDislikesByAritcleID(article.Id);
                    await _saveRepositoryAsync.DeleteSavesByAritcleID(article.Id);
                    await _commentRepositoryAsync.DeleteCommentsByAritcleID(article.Id);
                    await _reportRepositoryAsync.DeleteReportsByArticleId(article.Id);
                    await _articleRepositoryAsync.DeleteAsync(article);
                    

                }
                await _reportRepositoryAsync.DeleteReportsByUserId(request.UserId);
                await _likeRepositoryAsync.DeleteLikesByUserID(request.UserId);
                await _followRepositoryAsync.DeleteFollowByUserId(request.UserId);
                await _dislikeRepositoryAsync.DeleteDislikesByUserID(request.UserId);
                await _saveRepositoryAsync.DeleteSavesByUserID(request.UserId);
                await _commentRepositoryAsync?.DeleteCommentsByUserID(request.UserId);
                await _userRepositoryAsync.DeleteByID(user.UserId);



                return new Response<Guid>(XmlConvert.ToGuid(user.UserId));
            }
        }
    }
}
