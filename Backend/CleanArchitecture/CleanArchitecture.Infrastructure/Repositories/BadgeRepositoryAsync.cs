using CleanArchitecture.Core.Entities;
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
    public class BadgeRepositoryAsync : GenericRepositoryAsync<Badge>, IBadgeRepositoryAsync
    {
        private readonly DbSet<Badge> _badges;

        public BadgeRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _badges = dbContext.Set<Badge>();
        }
    }
}
