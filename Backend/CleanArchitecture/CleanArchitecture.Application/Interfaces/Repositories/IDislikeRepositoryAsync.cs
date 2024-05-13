using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Dislikes.Queries.GetDislikeIdByUserandArticleId;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Interfaces.Repositories
{
    public interface IDislikeRepositoryAsync : IGenericRepositoryAsync<Dislike>
    {
        Task<Dislike> CheckExistingDislike(string userId, int articleId);
        Task DeleteDislikesByUserID(string userId);
        Task DeleteDislikesByAritcleID(int id);
        Task<int> GetTotalDislikeByUserArticles(int id);
        Task <GetDislikeIdByUserandArticleIdViewModel> GetDislikeByIdByUserandArticleId(int articleId,string userId);
    }
}
