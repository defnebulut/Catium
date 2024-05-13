using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByName;
using CleanArchitecture.Core.Features.Users.Query.GetUserById;
using CleanArchitecture.Core.Features.Users.Query.GetUsersByUsername;
using CleanArchitecture.Core.Interfaces;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Infrastructure.Contexts;
using CleanArchitecture.Infrastructure.Models;
using CleanArchitecture.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Infrastructure.Repositories
{
    public class UserRepositoryAsync : GenericRepositoryAsync<User>, IUserRepositoryAsync
    {
        private readonly DbSet<User> _users;
        private readonly DbSet<ApplicationUser> _applicationusers;
        private readonly ApplicationDbContext _dbContext;

        public UserRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _applicationusers = dbContext.Set<ApplicationUser>();
            _users = dbContext.Set<User>();
            _dbContext = dbContext;

        }

        public async Task DeleteByID(string id)
        {
            var applicationUser = _applicationusers.FirstOrDefault(a => a.Id == id);
            var user = _users.FirstOrDefault(a => a.UserId == id);
            if (user != null)
            {
                _users.Remove(user);
                
            }
            if(applicationUser != null)
            {
                _applicationusers.Remove(applicationUser);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task<GetUserByIdViewModel> GetUserById(string id)
        {
            var applicationUser = _applicationusers.FirstOrDefault(a => a.Id == id);
            return await _users.
                Where(u => u.UserId == id).
                Select(u => new GetUserByIdViewModel 
                { UserId = u.UserId,
                UserName = u.UserName,
                UserEmail = applicationUser.Email,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Bio = u.Bio,
                Pp = u.PP}
                ).
                FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<GetUsersByUsernameViewModel>> GetUsersByName(string index)
        {
            return await _users.Where(a => a.UserName.Contains(index)).
                Select(a => new GetUsersByUsernameViewModel
                {
                    UserId = a.UserId,
                    UserName = a.UserName,
                    FirstName= a.FirstName,
                    LastName= a.LastName,
                    Bio = a.Bio,
                    PP = a.PP
                    

                }
                ).OrderBy(a => a.UserName).ToListAsync();
        }
    }
}
