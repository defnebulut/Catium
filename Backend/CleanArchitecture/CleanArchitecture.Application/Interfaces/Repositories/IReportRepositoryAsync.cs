using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllArticleReports;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllCommentReports;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllUserReports;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Interfaces.Repositories
{
    public interface IReportRepositoryAsync : IGenericRepositoryAsync<Report>
    {
        Task <IEnumerable<GetAllArticleReportsViewModel>> GetArticleReports(int id);
        Task <IEnumerable<GetAllCommentReportsViewModel>> GetCommentReports(int id);
        Task <IEnumerable<GetAllUserReportsViewModel>> GetUserReports(int id);
        Task DeleteReportsByCommentId(int commentId);
        Task DeleteReportsByArticleId(int articleId);
        Task DeleteReportsByUserId(string userId);
    }
}
