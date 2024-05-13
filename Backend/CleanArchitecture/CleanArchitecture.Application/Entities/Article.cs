namespace CleanArchitecture.Core.Entities
{
    public class Article : AuditableBaseEntity
    {
        public string Title { get; set; }
        public Category Category { get; set; }
        public string CoverPicture { get; set; }
        public string Content { get; set; }

        //Database Modified
    }
}
