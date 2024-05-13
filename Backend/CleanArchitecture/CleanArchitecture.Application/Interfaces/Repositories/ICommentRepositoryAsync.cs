using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Comments.Queries.GetCommentByCommentId;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Interfaces.Repositories
{
    public interface ICommentRepositoryAsync : IGenericRepositoryAsync<Comment>
    {
        Task DeleteCommentsByUserID(string userId);
        Task DeleteCommentsByAritcleID(int id);
        Task<IEnumerable<Comment>> GetCommentsByArticle(int id);
        Task<GetCommentByCommentIdViewModel> GetCommentById(int id);
    }
}
