using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Comments.Queries.GetCommentByCommentId;
using CleanArchitecture.Core.Features.Users.Query.GetUserById;
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
    public class CommentRepositoryAsync : GenericRepositoryAsync<Comment>, ICommentRepositoryAsync
    {
        private readonly DbSet<Comment> _comments;
        private readonly ApplicationDbContext _dbContext;
        public CommentRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _comments = dbContext.Set<Comment>();
            _dbContext = dbContext;
            
        }

        public async Task DeleteCommentsByAritcleID(int id)
        {
            var comments = await _comments.Where(c => c.ArticleId == id).ToListAsync();
            foreach (var comment in comments)
            {
                _comments.Remove(comment);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteCommentsByUserID(string userId)
        {
            var comments = await _comments.Where(c => c.UserID == userId).ToListAsync();
            foreach(var comment in comments)
            {
                _comments.Remove(comment);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task<GetCommentByCommentIdViewModel> GetCommentById(int id)
        {
            return await _comments.Where(c => c.Id == id).
                Select(c => new GetCommentByCommentIdViewModel
                {
                    Created_AuthorId = c.CreatedBy,
                    Comment_Text = c.Comment_Text,
                    ArticleId = c.ArticleId,
                }
                ).
                FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Comment>> GetCommentsByArticle(int id)
        {
            return await _comments.Where(c => c.ArticleId == id).ToListAsync();
        }
    }
}
