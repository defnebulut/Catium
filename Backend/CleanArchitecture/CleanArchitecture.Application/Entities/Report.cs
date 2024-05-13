using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Core.Entities
{
    public class Report : AuditableBaseEntity
    {
        public int Report_Type { get; set; }
        public int ReportedIntId { get; set; }
        public string ReportedStringId { get; set; }
        public string Report_Reason { get; set; }
    }
}
