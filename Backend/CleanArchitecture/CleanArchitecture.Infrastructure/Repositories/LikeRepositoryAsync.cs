using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Follows.Queries.GetFollowIdByFollowings;
using CleanArchitecture.Core.Features.Likes.Queries.GetLikeIdByUserandArticleId;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Infrastructure.Contexts;
using CleanArchitecture.Infrastructure.Models;
using CleanArchitecture.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Infrastructure.Repositories
{
    public class LikeRepositoryAsync : GenericRepositoryAsync<Like>, ILikeRepositoryAsync
    {
        private readonly DbSet<Like> _likes;
        private readonly DbSet<Article> _articles;
        private readonly ApplicationDbContext _dbContext;
        public LikeRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _likes = dbContext.Set<Like>();
            _articles = dbContext.Set<Article>();
            _dbContext = dbContext;
        }
        public async Task DeleteLikesByUserID(string userId)
        {
            var likes = await _likes.Where(l => l.UserID == userId).ToListAsync();
            foreach (var like in likes)
            {
                _likes.Remove(like);
            }
            await _dbContext.SaveChangesAsync();
        }
        public async Task DeleteLikesByAritcleID(int id)
        {

            var likes = await _likes.Where(l => l.ArticleId == id).ToListAsync();
            foreach (var like in likes)
            {
                _likes.Remove(like);
            }
            await _dbContext.SaveChangesAsync();

        }

       

        public async Task<int> GetTotalLikeByUserArticles(int id)
        {
            return await _likes.CountAsync(l => l.ArticleId == id);
        }

        public async Task<Like> CheckExistingLike(string userId, int articleId)
        {
            return await _likes.Where(l => l.UserID == userId && l.ArticleId == articleId).SingleOrDefaultAsync();
        }

        public async Task<GetLikeIdByUserandArticleIdViewModel> GetLikeByIdByUserandArticleId(int articleId, string userId)
        {
            return await _likes.Where(l => l.UserID == userId && l.ArticleId == articleId).
                Select(l => new GetLikeIdByUserandArticleIdViewModel
                {
                    Id = l.Id,
                    ArticleId = l.ArticleId,
                    UserID = l.UserID,
                }
                ).FirstOrDefaultAsync();
        }
    }
}
