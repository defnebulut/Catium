using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Products.Commands.DeleteProductById
{
    public class DeleteArticleByIdCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public class DeleteAricleByIdCommandHandler : IRequestHandler<DeleteArticleByIdCommand, Response<int>>
        {
            private readonly IArticleRepositoryAsync _articleRepository;
            private readonly ILikeRepositoryAsync _likeRepositoryAsync;
            private readonly IDislikeRepositoryAsync _dislikeRepositoryAsync;
            private readonly ISaveRepositoryAsync _saveRepositoryAsync;
            private readonly ICommentRepositoryAsync _commentRepositoryAsync;
            private readonly IReportRepositoryAsync _reportRepositoryAsync;
            public DeleteAricleByIdCommandHandler(IArticleRepositoryAsync articleRepositoryAsync,ILikeRepositoryAsync likeRepositoryAsync, IDislikeRepositoryAsync dislikeRepositoryAsync, ISaveRepositoryAsync saveRepositoryAsync, ICommentRepositoryAsync commentRepositoryAsync, IReportRepositoryAsync reportRepositoryAsync)
            {
                _articleRepository = articleRepositoryAsync;
                _likeRepositoryAsync = likeRepositoryAsync;
                _dislikeRepositoryAsync = dislikeRepositoryAsync;
                _saveRepositoryAsync = saveRepositoryAsync;
                _commentRepositoryAsync = commentRepositoryAsync;
                _reportRepositoryAsync = reportRepositoryAsync;
            }
            public async Task<Response<int>> Handle(DeleteArticleByIdCommand command, CancellationToken cancellationToken)
            {
                var product = await _articleRepository.GetByIdAsync(command.Id);
                if (product == null) throw new ApiException($"Article Not Found.");
                
                await _reportRepositoryAsync.DeleteReportsByArticleId(command.Id);
                await _likeRepositoryAsync.DeleteLikesByAritcleID(command.Id);
                await _dislikeRepositoryAsync.DeleteDislikesByAritcleID(command.Id);
                await _commentRepositoryAsync.DeleteCommentsByAritcleID(command.Id);
                await _saveRepositoryAsync.DeleteSavesByAritcleID(command.Id);
                await _articleRepository.DeleteAsync(product);
                return new Response<int>(product.Id);
            }
        }
    }
}
