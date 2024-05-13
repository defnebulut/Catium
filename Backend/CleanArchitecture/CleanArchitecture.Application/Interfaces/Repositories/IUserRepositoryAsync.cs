using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByName;
using CleanArchitecture.Core.Features.Users.Query.GetUserById;
using CleanArchitecture.Core.Features.Users.Query.GetUsersByUsername;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Interfaces.Repositories
{
    public interface IUserRepositoryAsync : IGenericRepositoryAsync<User>
    {
        Task<IEnumerable<GetUsersByUsernameViewModel>> GetUsersByName(string index);
        Task DeleteByID(string id);
        Task <GetUserByIdViewModel> GetUserById(string id);
    }
}
