using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Users.Commands.UpdateUser
{
    public class UpdateUserCommand : IRequest<Response<int>>
    {
        public string UserId { get; set; }
        public string Bio { get; set; }
        public string PP { get; set; }
    }
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, Response<int>>
    {
        private readonly IUserRepositoryAsync _userRepositoryAsync;

        public UpdateUserCommandHandler(IUserRepositoryAsync userRepositoryAsync)
        {
            _userRepositoryAsync = userRepositoryAsync;
        }
        public async Task<Response<int>> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepositoryAsync.GetByIdAsync(request.UserId);
            if (user == null) throw new EntityNotFoundException("user", request.UserId);

            user.Bio = request.Bio;
            user.PP = request.PP;

           

            await _userRepositoryAsync.UpdateAsync(user);
            return new Response<int>(user.UserId);
        }
    }
}
