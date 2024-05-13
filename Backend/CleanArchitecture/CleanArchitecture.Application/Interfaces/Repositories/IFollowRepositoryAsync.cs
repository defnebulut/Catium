using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Follows.Queries.GetFollowIdByFollowings;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Interfaces.Repositories
{
    public interface IFollowRepositoryAsync : IGenericRepositoryAsync<Follow>
    {
        Task DeleteFollowByUserId(string id);
        Task <GetFollowIdByFollowingViewModel> GetFollowById(string followId,string followedId);
        Task <Follow> GetFollowByIdandFollowedId (string followId,string followedId);
        Task<IEnumerable<User>> GetFollowersByUserId(string id);
        Task<IEnumerable<User>> GetFollowedsByUserId(string id);
       
    }
}
