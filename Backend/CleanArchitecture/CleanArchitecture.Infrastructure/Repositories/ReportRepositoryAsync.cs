using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByFollowByUserId;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllArticleReports;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllCommentReports;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllUserReports;
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
    public class ReportRepositoryAsync : GenericRepositoryAsync<Report>, IReportRepositoryAsync
    {
        private readonly DbSet<Report> _reports;
        private readonly ApplicationDbContext _dbContext;
        public ReportRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _reports = dbContext.Set<Report>();
            _dbContext = dbContext;
        }

        public async Task DeleteReportsByArticleId(int articleId)
        {
            var reports = await _reports.Where(r => r.ReportedIntId == articleId).ToListAsync();
            foreach (var report in reports)
            {
                _reports.Remove(report);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteReportsByCommentId(int commentId)
        {
            var reports = await _reports.Where(r => r.ReportedIntId == commentId).ToListAsync();
            foreach (var report in reports)
            {
                _reports.Remove(report);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteReportsByUserId(string userId)
        {
            var reports = await _reports.Where(r => r.ReportedStringId == userId).ToListAsync();
            foreach(var report in reports)
            {
                _reports.Remove(report);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<GetAllArticleReportsViewModel>> GetArticleReports(int id)
        {
            if (id != 2) throw new ApiException($"Report Type Not Matching.");

            return await _reports.Where(r => r.Report_Type == id).
                Select(a => new GetAllArticleReportsViewModel
                {
                    Id = a.Id,
                    Report_Type = a.Report_Type,
                    ReportedIntId = a.ReportedIntId,
                    ReportedStringId = a.ReportedStringId,
                    Report_Reason = a.Report_Reason,

                }).ToListAsync();
        }

        public async Task<IEnumerable<GetAllCommentReportsViewModel>> GetCommentReports(int id)
        {
            if (id != 3) throw new ApiException($"Report Type Not Matching.");

            return await _reports.Where(r => r.Report_Type == id).
                Select(a => new GetAllCommentReportsViewModel
                {
                    Id = a.Id,
                    Report_Type = a.Report_Type,
                    ReportedIntId = a.ReportedIntId,
                    ReportedStringId = a.ReportedStringId,
                    Report_Reason = a.Report_Reason,

                }).ToListAsync();
        }

        public async Task<IEnumerable<GetAllUserReportsViewModel>> GetUserReports(int id)
        {
            if (id != 1) throw new ApiException($"Report Type Not Matching.");

            return await _reports.Where(r => r.Report_Type == id).
                Select(a => new GetAllUserReportsViewModel
                {
                    Id = a.Id,
                    Report_Type = a.Report_Type,
                    ReportedIntId = a.ReportedIntId,
                    ReportedStringId = a.ReportedStringId,
                    Report_Reason = a.Report_Reason,

                }).ToListAsync();   
        }
    }
}
