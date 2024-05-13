using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Users.Query.GetUserById
{
    public class GetUserByIdQuery : IRequest<Response<GetUserByIdViewModel>>
    {
        public string UserId { get; set; }
        public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery,Response<GetUserByIdViewModel>>
        {
            private readonly IUserRepositoryAsync _userRepositoryAsync;

            
            public GetUserByIdQueryHandler(IUserRepositoryAsync userRepositoryAsync)
            {
                _userRepositoryAsync = userRepositoryAsync;
            }

            public async Task<Response<GetUserByIdViewModel>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
            {
                var user = await _userRepositoryAsync.GetUserById(request.UserId);
                if (user == null) throw new ApiException($"User Not Found.");
                return new Response<GetUserByIdViewModel>(user);
            }
        }
    }
}
