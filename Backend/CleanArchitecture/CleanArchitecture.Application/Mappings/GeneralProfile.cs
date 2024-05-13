using AutoMapper;
using CleanArchitecture.Core.Entities;
using CleanArchitecture.Core.Features.Badges.Commands.CreateBadge;
using CleanArchitecture.Core.Features.Categories.Commands.CreateCategory;
using CleanArchitecture.Core.Features.Categories.Queries.GetAllCategories;
using CleanArchitecture.Core.Features.Comments.Commands.CreateCommand;
using CleanArchitecture.Core.Features.Comments.Queries.GetAllCommentsByArticleId;
using CleanArchitecture.Core.Features.Dislikes.Commands.CreateDislike;
using CleanArchitecture.Core.Features.Follows.Commands.CreateFollow;
using CleanArchitecture.Core.Features.Follows.Commands.NewFolder;
using CleanArchitecture.Core.Features.Follows.Queries.GetAllFollowersByUserId;
using CleanArchitecture.Core.Features.Follows.Queries.GetAllFollowingsByFollowsId;
using CleanArchitecture.Core.Features.Follows.Queries.GetFollowingsByFollowsId;
using CleanArchitecture.Core.Features.Likes.Commands.CreateLike;
using CleanArchitecture.Core.Features.Products.Commands.CreateProduct;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticleByName;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByCategoryId;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByFollowByUserId;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByName;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesByUserId;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesLikedByUser;
using CleanArchitecture.Core.Features.Products.Queries.GetAllArticlesSavedByUser;
using CleanArchitecture.Core.Features.Products.Queries.GetAllProducts;
using CleanArchitecture.Core.Features.Reports.Commands.CreateArticleReport;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllArticleReports;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllCommentReports;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllReports;
using CleanArchitecture.Core.Features.Reports.Queries.GetAllUserReports;
using CleanArchitecture.Core.Features.Saves.Commands.CreateSave;
using CleanArchitecture.Core.Features.Users.Query.GetAllUsers;
using CleanArchitecture.Core.Features.Users.Query.GetUsersByUsername;

namespace CleanArchitecture.Core.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<Article, GetAllArticlesViewModel>().ReverseMap();
            CreateMap<CreateArticleCommand, Article>();
            CreateMap<GetAllArticlesQuery, GetAllArticlesParameter>();
            CreateMap<CreateFollowCommand, Follow>();
            CreateMap<DeleteFollowCommand, Follow>();
            CreateMap<CreateLikeCommand, Like>();
            CreateMap<CreateDislikeCommand, Dislike>();
            CreateMap<CreateSaveCommand, Save>();
            CreateMap<CreateCommentCommand, Comment>();
            CreateMap<CreateBadgeCommand, Badge>();
            CreateMap<CreateReportCommand, Report>();
            CreateMap<GetAllUsersQuery, GetAllUsersParameter>();
            CreateMap<CreateCategoryCommand, Category>();
            CreateMap<User, GetAllUsersViewModel>().ReverseMap();
            CreateMap<Category, GetAllCategoriesViewModel>().ReverseMap();
            CreateMap<GetAllCategoriesQuery, GetAllCategoriesParameter>();
            CreateMap<Article,GetAllArticlesByCategoryIdViewModel>().ReverseMap();
            CreateMap<GetAllArticlesByCategoryIdQuery, GetAllArticlesByCategoryIdParameter>();
            CreateMap<Article,GetAllArticlesByUserIdViewModel>().ReverseMap();
            CreateMap<GetAllArticlesByUserIdQuery, GetAllArticlesByUserIdParameter>();
            CreateMap<Article,GetAllArticlesSavedByUserViewModel>().ReverseMap();
            CreateMap<GetAllArticlesSavedByUserQuery, GetAllArticlesSavedByUserParameter>();
            CreateMap<Comment,GetAllCommentsByArticleIdViewModel>().ReverseMap();
            CreateMap<GetAllCommentsByArticleIdQuery, GetAllCommentsByArticleIdParameter>();
            CreateMap<User,GetAllFollowersByUserIdViewModel>().ReverseMap();
            CreateMap<GetAllFollowersByUserIdQuery, GetAllFollowersByUserIdParameter>();
            CreateMap<User,GetAllFollowingsByFollowsIdViewModel>().ReverseMap();
            CreateMap<GetAllFollowingsByFollowsIdQuery,GetAllFollowingsByFollowsIdParameter>();
            CreateMap<Article, GetAllArticlesByNameViewModel>().ReverseMap();
            CreateMap<GetAllArticlesByNameQuery, GetAllArticlesByNameParameter>();
            CreateMap<Article,GetAllArticlesByFollowByUserIdViewModel>().ReverseMap();
            CreateMap<GetAllArticlesByFollowByUserIdQuery, GetAllArticlesByFollowByUserIdParameter>();
            CreateMap<Article,GetAllArticlesLikedByUserViewModel>().ReverseMap();
            CreateMap<GetAllArticlesLikedByUserQuery, GetAllArticlesLikedByUserParameter>();
            CreateMap<Report,GetAllReportsViewModel>().ReverseMap();
            CreateMap<GetAllReportsQuery, GetAllReportsParameter>();
            CreateMap<Report,GetAllCommentReportsViewModel>().ReverseMap();
            CreateMap<GetAllCommentReportsQuery, GetAllCommentReportsParameter>();
            CreateMap<Report,GetAllUserReportsViewModel>().ReverseMap();
            CreateMap<GetAllUserReportsQuery, GetAllUserReportsParameter>();
            CreateMap<Report,GetAllArticleReportsViewModel>().ReverseMap();
            CreateMap<GetAllArticleReportsQuery, GetAllArticleReportsParameter>();
            CreateMap<User,GetUsersByUsernameViewModel>().ReverseMap();
            CreateMap<GetUsersByUsernameQuery, GetUsersByUsernameParameter>();



        }
    }
}
