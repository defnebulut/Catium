using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Follows.Queries.GetFollowIdByFollowings;
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
    public class FollowRepositoryAsync : GenericRepositoryAsync<Follow>, IFollowRepositoryAsync
    {
        private readonly DbSet<Follow> _follows;
        private readonly DbSet<User> _users;
        private readonly ApplicationDbContext _dbContext;

        public FollowRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {

            _follows = dbContext.Set<Follow>();
            _users = dbContext.Set<User>();
            _dbContext = dbContext;
        }

        public async Task DeleteFollowByUserId(string id)
        {
            var follows = await _follows.Where(f => f.UserFollowsId == id || f.UserFollowedId == id).ToListAsync();
            foreach (var f in follows)
            {
                _follows.Remove(f);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task<GetFollowIdByFollowingViewModel> GetFollowById(string followId, string followedId)
        {
            return await _follows.Where(f => f.UserFollowsId == followId && f.UserFollowedId == followedId ).
                Select(f => new GetFollowIdByFollowingViewModel
                {
                    Id = f.Id,
                    UserFollowedId = f.UserFollowedId,
                    UserFollowsId = f.UserFollowsId,
                }
                ).FirstOrDefaultAsync();
           
        }

        public async Task<Follow> GetFollowByIdandFollowedId(string followId, string followedId)
        {
            return await _follows.FirstOrDefaultAsync(f => f.UserFollowsId == followId && f.UserFollowedId == followedId);
         
        }

        public async Task<IEnumerable<User>> GetFollowedsByUserId(string id)
        {
            var followedIds = await _follows.Where(f => f.UserFollowsId == id).Select(f => f.UserFollowedId).ToListAsync();
            return await _users.Where(u => followedIds.Contains(u.UserId)).ToListAsync();
        }

        public async Task<IEnumerable<User>> GetFollowersByUserId(string id)
        {
            var followerIds = await _follows.Where(f => f.UserFollowedId == id).Select(f => f.UserFollowsId).ToListAsync();
            return await _users.Where(u => followerIds.Contains(u.UserId)).ToListAsync();
        }

        
    }
    }

