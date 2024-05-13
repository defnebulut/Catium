using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Features.Reports.Queries.GetAllUserReports
{
    public class GetAllUserReportsViewModel
    {
        public int Id { get; set; }
        public int Report_Type { get; set; }
        public int ReportedIntId { get; set; }
        public string ReportedStringId { get; set; }
        public string Report_Reason { get; set; }
    }
}
