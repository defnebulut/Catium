using Moq;
using CleanArchitecture.Core.Interfaces.Repositories;
using AutoFixture;
using CleanArchitecture.Core.Entities;
using static CleanArchitecture.Core.Features.Products.Commands.UpdateProduct.UpdateArticleCommand;
using CleanArchitecture.Core.Features.Products.Commands.UpdateProduct;
using CleanArchitecture.Core.Exceptions;

namespace CleanArchitecture.UnitTests
{
    public class Products
    {
        private readonly Fixture fixture;
        private readonly Mock<IArticleRepositoryAsync> articleRepositoryAsync;
        private readonly Mock<ICategoryRepositoryAsync> categoryRepositoryAsync;

        public Products()
        {
            fixture = new Fixture();
            articleRepositoryAsync = new Mock<IArticleRepositoryAsync>();
            categoryRepositoryAsync = new Mock<ICategoryRepositoryAsync>();
        }

        [Fact]
        public void When_UpdateArticleCommandHandlerInvoked_WithNotExistingArticle_ShouldThrowEntityNotFoundException()
        {
            articleRepositoryAsync
                .Setup(pr => pr.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync((Article) null);
            categoryRepositoryAsync
                .Setup(pr => pr.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(this.fixture.Create<Category>);

            var updateArticleCommandHandler = new UpdateArticleCommandHandler(articleRepositoryAsync.Object, categoryRepositoryAsync.Object);

            var command = this.fixture.Create<UpdateArticleCommand>();
            var cancellationToken = this.fixture.Create<CancellationToken>();

            Assert.ThrowsAsync<EntityNotFoundException>(() => updateArticleCommandHandler.Handle(command, cancellationToken));
        }

        [Fact]
        public void When_UpdateArticleCommandHandlerInvoked_WithNotExistingCategory_ShouldThrowEntityNotFoundException()
        {
            articleRepositoryAsync
                .Setup(pr => pr.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(this.fixture.Create<Article>);

            categoryRepositoryAsync
                .Setup(pr => pr.GetByIdAsync(It.IsAny<int>()))
                .ReturnsAsync((Category)null);

            var updateArticleCommandHandler = new UpdateArticleCommandHandler(articleRepositoryAsync.Object, categoryRepositoryAsync.Object);

            var command = this.fixture.Create<UpdateArticleCommand>();
            var cancellationToken = this.fixture.Create<CancellationToken>();

            Assert.ThrowsAsync<EntityNotFoundException>(() => updateArticleCommandHandler.Handle(command, cancellationToken));
        }

    }
}