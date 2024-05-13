using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Comments.Queries.GetCommentByCommentId
{
    public class GetCommentByCommentIdQuery : IRequest<Response<GetCommentByCommentIdViewModel>>
    {
        public int Id { get; set; }

        public class GetCommentByCommentIdQueryHandler : IRequestHandler<GetCommentByCommentIdQuery, Response<GetCommentByCommentIdViewModel>>
        {
            private readonly ICommentRepositoryAsync _commentRepositoryAsync;
            
            public GetCommentByCommentIdQueryHandler(ICommentRepositoryAsync commentRepositoryAsync)
            {
                _commentRepositoryAsync = commentRepositoryAsync;
            }
            public async Task<Response<GetCommentByCommentIdViewModel>> Handle(GetCommentByCommentIdQuery request, CancellationToken cancellationToken)
            {
                var comment = await _commentRepositoryAsync.GetCommentById(request.Id);
                if (comment == null) throw new ApiException($"Comment Not Found.");
                return new Response<GetCommentByCommentIdViewModel>(comment);
            }
        }
    }
}
