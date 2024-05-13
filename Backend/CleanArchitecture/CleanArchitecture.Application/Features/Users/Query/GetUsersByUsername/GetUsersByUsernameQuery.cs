using AutoMapper;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Users.Query.GetUsersByUsername
{
    public class GetUsersByUsernameQuery : IRequest<PagedResponse<IEnumerable<GetUsersByUsernameViewModel>>>
    {
        public string Index { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetUsersByUsernameQueryHandler : IRequestHandler<GetUsersByUsernameQuery, PagedResponse<IEnumerable<GetUsersByUsernameViewModel>>>
        {
            private readonly IUserRepositoryAsync _userRepositoryAsync;
            private readonly IMapper _mapper;

            public GetUsersByUsernameQueryHandler(IMapper mapper, IUserRepositoryAsync userRepositoryAsync)
            {
                _mapper = mapper;
                _userRepositoryAsync = userRepositoryAsync;
            }
            public async Task<PagedResponse<IEnumerable<GetUsersByUsernameViewModel>>> Handle(GetUsersByUsernameQuery request, CancellationToken cancellationToken)
            {
                var valid = _mapper.Map<GetUsersByUsernameParameter>(request);
                var users = await _userRepositoryAsync.GetUsersByName(request.Index);
                var userlist = _mapper.Map<IEnumerable<GetUsersByUsernameViewModel>>(users);

                return new PagedResponse<IEnumerable<GetUsersByUsernameViewModel>>(userlist, valid.PageNumber, valid.PageSize);
            }
        }
    }
}
