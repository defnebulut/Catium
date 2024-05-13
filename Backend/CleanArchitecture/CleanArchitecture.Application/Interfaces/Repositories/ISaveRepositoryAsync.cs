using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Saves.Queries.GetSaveIdByUserandArticleId;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Interfaces.Repositories
{
    public interface ISaveRepositoryAsync : IGenericRepositoryAsync<Save>
    {
        Task<Save> CheckExistingSave(string userId, int aritlceId);
        Task DeleteSavesByUserID(string userId);
        Task DeleteSavesByAritcleID(int id);
        Task<GetSaveIdByUserandArticleIdViewModel> GetSaveByIdByUserandArticleId(int articleId, string userId);
        
    }
}
