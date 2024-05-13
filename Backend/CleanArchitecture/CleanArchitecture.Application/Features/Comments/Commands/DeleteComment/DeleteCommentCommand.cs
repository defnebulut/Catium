using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Comments.Commands.DeleteComment
{
    public class DeleteCommentCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }

        public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand, Response<int>>
        {
            private readonly ICommentRepositoryAsync _commentRepositoryAsync;
            private readonly IReportRepositoryAsync _reportRepositoryAsync;

            public DeleteCommentCommandHandler(ICommentRepositoryAsync commentRepositoryAsync, IReportRepositoryAsync reportRepositoryAsync)
            {
                _commentRepositoryAsync = commentRepositoryAsync;
                _reportRepositoryAsync = reportRepositoryAsync;
            }
            public async Task<Response<int>> Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
            {
                var comment = await _commentRepositoryAsync.GetByIdAsync(request.Id);
                if (comment == null) throw new ApiException($"Comment Not Found.");
                
                await _reportRepositoryAsync.DeleteReportsByCommentId(comment.Id);
                await _commentRepositoryAsync.DeleteAsync(comment);
                
                return new Response<int>(comment.Id);
            }
        }
    }
   
}
