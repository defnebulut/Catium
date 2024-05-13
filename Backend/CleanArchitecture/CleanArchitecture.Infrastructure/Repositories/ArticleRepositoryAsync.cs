using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByCategoryId;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByFollowByUserId;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByName;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByUserId;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesLikedByUser;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesSavedByUser;
using CleanArchitecture.Core.Features.Products.Queries.GetAllProducts;
using CleanArchitecture.Core.Features.Products.Queries.GetArticleById;
using CleanArchitecture.Core.Features.Users.Query.GetUserById;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Infrastructure.Contexts;
using CleanArchitecture.Infrastructure.Models;
using CleanArchitecture.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CleanArchitecture.Infrastructure.Repositories
{
    public class ArticleRepositoryAsync : GenericRepositoryAsync<Article>, IArticleRepositoryAsync
    {
        private readonly DbSet<Article> _articles;
        private readonly DbSet<Category> _categories;
        private readonly DbSet<User> _users;
        private readonly DbSet<Follow> _follows;
        private readonly DbSet<Save> _saves;
        private readonly DbSet<Like> _like;
        

        public ArticleRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _articles = dbContext.Set<Article>();
            _categories = dbContext.Set<Category>();
            _users = dbContext.Set<User>();
            _follows = dbContext.Set<Follow>();
            _saves = dbContext.Set<Save>();
            _like = dbContext.Set<Like>();
             
        }

        public async Task<IEnumerable<GetAllArticlesByNameViewModel>> GetAllArticlesByNameAsync(string index)
        {
            return await _articles.Where(a => a.Title.Contains(index)).
                Select(a => new GetAllArticlesByNameViewModel
                {
                    ArticleId = a.Id,
                    Title = a.Title,
                    CategoryId = a.Category.Id,
                    CoverPicture = a.CoverPicture,
                    Content = a.Content,
                    CreatedBy = a.CreatedBy,

                }
                ).OrderBy(a => a.Title).ToListAsync();



        }

        public async Task<IEnumerable<GetAllArticlesViewModel>> GetAllArticlesList()
        {
            return await _articles.Select(a => new GetAllArticlesViewModel
            {
                Id = a.Id,
                Title = a.Title,
                Category = a.Category.Id,
                CoverPicture = a.CoverPicture,
                Content = a.Content,
                CreatedBy = a.CreatedBy,
                CreatedDate = a.Created,

            }
                ).OrderByDescending(a => a.CreatedDate).ToListAsync();
        }

        public async Task<GetArticleByIdViewModel> GetArticleById(int id)
        {
            return await _articles.Where(a => a.Id == id).
                Select(a => new GetArticleByIdViewModel
                {
                    Id = a.Id,
                    Title = a.Title,
                    Category = a.Category.Id,
                    CoverPicture = a.CoverPicture,
                    Content = a.Content,
                    CreatedBy = a.CreatedBy,
                    CreatedDate = a.Created,

                }).FirstOrDefaultAsync();
        }

        /*public async Task<List<string>> GetArticleIdsByUser(string id)
        {
            return await _articles.Where(a => a.CreatedBy == id).ToListAsync();
        }*/

        public async Task<IEnumerable<GetAllArticlesByCategoryIdViewModel>> GetArticlesByCategory(int id)
        {
            return await _articles.Where(a => a.Category.Id == id).
                Select(a => new GetAllArticlesByCategoryIdViewModel
                {
                    ArticleId = a.Id,
                    Title = a.Title,
                    CategoryId = a.Category.Id,
                    CoverPicture = a.CoverPicture,
                    Content = a.Content,
                    CreatedBy = a.CreatedBy,

                }).ToListAsync();
        }

        public async Task<IEnumerable<GetAllArticlesByFollowByUserIdViewModel>> GetArticlesByFollowers(string id)
        {
            var followedIds = await _follows.Where(f => f.UserFollowsId == id).Select(f => f.UserFollowedId).ToListAsync();
            return await _articles.Where(a => followedIds.Contains(a.CreatedBy)).
                Select(a => new GetAllArticlesByFollowByUserIdViewModel
                {
                ArticleId = a.Id,
                Title = a.Title,
                CategoryId = a.Category.Id,
                CoverPicture = a.CoverPicture,
                Content = a.Content,
                CreatedBy = a.CreatedBy,

            }).ToListAsync();


        }

        public async Task<IEnumerable<GetAllArticlesSavedByUserViewModel>> GetArticlesBySavesByUser(string id)
        {
            var saveIds = await _saves.Where(s => s.UserID == id).Select(s => s.ArticleId).ToListAsync();
            return await _articles.Where(a => saveIds.Contains(a.Id)).
                Select(a => new GetAllArticlesSavedByUserViewModel
                {
                    ArticleId = a.Id,
                    Title = a.Title,
                    CategoryId = a.Category.Id,
                    CoverPicture = a.CoverPicture,
                    Content = a.Content,
                    CreatedBy = a.CreatedBy,

                }).ToListAsync();
        }

        public async Task<IEnumerable<Article>> GetArticlesByUser(string id)
        {
            return await _articles.Where(a => a.CreatedBy == id).ToListAsync();
        }

        public async Task<IEnumerable<GetAllArticlesByUserIdViewModel>> GetArticlesByUserViewModel(string id)
        {
            return await _articles.
                Where(a => a.CreatedBy == id).
                Select(a => new GetAllArticlesByUserIdViewModel
                {
                    ArticleId = a.Id,
                    Title = a.Title,
                    CategoryId = a.Category.Id,
                    CoverPicture = a.CoverPicture,
                    Content = a.Content,
                    
                }
                ).ToListAsync();
        }

        public async Task<IEnumerable<GetAllArticlesLikedByUserViewModel>> GetArticlesLikedByUser(string id)
        {
            var likeIds = await _like.Where(l => l.UserID == id).Select(l =>l.ArticleId).ToListAsync();
            return await _articles.Where(a => likeIds.Contains(a.Id)).
                Select(a => new GetAllArticlesLikedByUserViewModel
                {
                    ArticleId = a.Id,
                    Title = a.Title,
                    CategoryId = a.Category.Id,
                    CoverPicture = a.CoverPicture,
                    Content = a.Content,
                    CreatedBy = a.CreatedBy,

                }).ToListAsync();
        }
    }
}
