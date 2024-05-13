using AutoMapper;
using CleanArchitecture.Core.Features.Products.Queries.GetAllProducts;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Users.Query.GetAllUsers
{
    public class GetAllUsersQuery : IRequest<PagedResponse<IEnumerable<GetAllUsersViewModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, PagedResponse<IEnumerable<GetAllUsersViewModel>>>
        {
            private readonly IUserRepositoryAsync _userRepository;
            private readonly IMapper _mapper;
            public GetAllUsersQueryHandler(IUserRepositoryAsync userRepositoryAsync, IMapper mapper)
            {
                _userRepository = userRepositoryAsync;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<GetAllUsersViewModel>>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
            {
                var validFilter = _mapper.Map<GetAllUsersParameter>(request);
                var user = await _userRepository.GetPagedReponseAsync(validFilter.PageNumber, validFilter.PageSize);
                var userViewModel = _mapper.Map<IEnumerable<GetAllUsersViewModel>>(user);
                return new PagedResponse<IEnumerable<GetAllUsersViewModel>>(userViewModel, validFilter.PageNumber, validFilter.PageSize);
            }
        }
    }

   
}
