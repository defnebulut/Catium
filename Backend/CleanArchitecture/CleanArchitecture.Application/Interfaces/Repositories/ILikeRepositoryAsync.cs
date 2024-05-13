using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Likes.Queries.GetAllLikesByUserId;
using CleanArchitecture.Core.Features.Likes.Queries.GetLikeIdByUserandArticleId;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Interfaces.Repositories
{
    public interface ILikeRepositoryAsync : IGenericRepositoryAsync<Like>
    {
        Task DeleteLikesByUserID(string userId);
        Task DeleteLikesByAritcleID(int id);
        Task <Like> CheckExistingLike(string userId,int articleId);
        Task<int> GetTotalLikeByUserArticles(int id);
        Task<GetLikeIdByUserandArticleIdViewModel> GetLikeByIdByUserandArticleId(int articleId,string userId);
    }
}
