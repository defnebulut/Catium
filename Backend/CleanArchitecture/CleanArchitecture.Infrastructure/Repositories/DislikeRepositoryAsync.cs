using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Dislikes.Queries.GetDislikeIdByUserandArticleId;
using CleanArchitecture.Core.Features.Likes.Queries.GetLikeIdByUserandArticleId;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Infrastructure.Contexts;
using CleanArchitecture.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Infrastructure.Repositories
{
    public class DislikeRepositoryAsync : GenericRepositoryAsync<Dislike>, IDislikeRepositoryAsync
    {
        private readonly DbSet<Dislike> _dislikes;
        private readonly ApplicationDbContext _dbContext;
        public DislikeRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dislikes = dbContext.Set<Dislike>();
            _dbContext = dbContext;
        }

        public async Task<Dislike> CheckExistingDislike(string userId, int articleId)
        {
            return await _dislikes.Where(d => d.UserID == userId && d.ArticleId == articleId).SingleOrDefaultAsync(); 
        }

        public async Task DeleteDislikesByAritcleID(int id)
        {
            var dislikes = await _dislikes.Where(d => d.ArticleId == id).ToListAsync();
            foreach (var dislike in dislikes)
            {
                _dislikes.Remove(dislike);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteDislikesByUserID(string userId)
        {
            var dislikes = await _dislikes.Where(d => d.UserID == userId).ToListAsync();
            foreach (var dislike in dislikes)
            {
                _dislikes.Remove(dislike);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task<GetDislikeIdByUserandArticleIdViewModel> GetDislikeByIdByUserandArticleId(int articleId, string userId)
        {
            return await _dislikes.Where(d => d.UserID == userId && d.ArticleId == articleId).
                Select(d => new GetDislikeIdByUserandArticleIdViewModel
                {
                    Id = d.Id,
                    ArticleId = d.ArticleId,
                    UserID = d.UserID,
                }
                ).FirstOrDefaultAsync();
        }

        public async Task<int> GetTotalDislikeByUserArticles(int id)
        {
            return await _dislikes.CountAsync(d => d.ArticleId == id);
        }
    }
}
