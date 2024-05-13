using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByCategoryId;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByFollowByUserId;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByName;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByUserId;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesLikedByUser;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesSavedByUser;
using CleanArchitecture.Core.Features.Products.Queries.GetAllProducts;
using CleanArchitecture.Core.Features.Products.Queries.GetArticleById;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Interfaces.Repositories
{
    public interface IArticleRepositoryAsync : IGenericRepositoryAsync<Article>
    {
        Task<IEnumerable<GetAllArticlesByNameViewModel>> GetAllArticlesByNameAsync(string index);
        Task<IEnumerable<GetAllArticlesByCategoryIdViewModel>> GetArticlesByCategory(int id);
        Task<IEnumerable<Article>> GetArticlesByUser(string id);
        Task<IEnumerable<GetAllArticlesByUserIdViewModel>> GetArticlesByUserViewModel(string id);
        Task<IEnumerable<GetAllArticlesByFollowByUserIdViewModel>> GetArticlesByFollowers(string id);
        Task<IEnumerable<GetAllArticlesSavedByUserViewModel>> GetArticlesBySavesByUser(string id);
        Task<IEnumerable<GetAllArticlesLikedByUserViewModel>> GetArticlesLikedByUser(string id);
        Task<IEnumerable<GetAllArticlesViewModel>> GetAllArticlesList();
        Task<GetArticleByIdViewModel> GetArticleById(int id);
        //Task<List<string>> GetArticleIdsByUser(string id);
    }
}
