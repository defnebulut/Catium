using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Likes.Queries.GetLikeIdByUserandArticleId;
using CleanArchitecture.Core.Features.Saves.Queries.GetSaveIdByUserandArticleId;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Infrastructure.Contexts;
using CleanArchitecture.Infrastructure.Migrations;
using CleanArchitecture.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Infrastructure.Repositories
{
    public class SaveRepositoryAsync : GenericRepositoryAsync<Save>, ISaveRepositoryAsync
    {
        private readonly DbSet<Save> _saveSet;
        private readonly ApplicationDbContext _dbContext;
        public SaveRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _saveSet = dbContext.Set<Save>();
            _dbContext = dbContext;
        }

        public async Task<Save> CheckExistingSave(string userId, int aritlceId)
        {
            return await _saveSet.Where(s => s.UserID == userId && s.ArticleId == aritlceId).FirstOrDefaultAsync(); 
        }

        public async Task DeleteSavesByAritcleID(int id)
        {
            var saves = await _saveSet.Where(s => s.ArticleId == id).ToListAsync();
            foreach (var save in saves)
            {
                _saveSet.Remove(save);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteSavesByUserID(string userId)
        {
            var saves = await _saveSet.Where(s => s.UserID == userId).ToListAsync();
            foreach(var save in saves)
            {
                _saveSet.Remove(save);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task<GetSaveIdByUserandArticleIdViewModel> GetSaveByIdByUserandArticleId(int articleId, string userId)
        {
            return await _saveSet.Where(s => s.UserID == userId && s.ArticleId == articleId).
                Select(s => new GetSaveIdByUserandArticleIdViewModel
                {
                    Id = s.Id,
                    ArticleId = s.ArticleId,
                    UserID = s.UserID,
                }
                ).FirstOrDefaultAsync();
        }
    }
}
