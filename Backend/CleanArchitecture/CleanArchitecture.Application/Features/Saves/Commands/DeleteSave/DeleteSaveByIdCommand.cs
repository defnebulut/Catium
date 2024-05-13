using CleanArchitecture.Core.Exceptions;
using CleanArchitecture.Core.Interfaces.Repositories;
using CleanArchitecture.Core.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Features.Saves.Commands.DeleteSave
{
    public class DeleteSaveByIdCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }

        public class DeleteSaveByIdCommandHandler : IRequestHandler<DeleteSaveByIdCommand, Response<int>>
        {

            private readonly ISaveRepositoryAsync _saveRepository;

            public DeleteSaveByIdCommandHandler(ISaveRepositoryAsync saveRepository)
            {
                _saveRepository = saveRepository;
            }

            public async Task<Response<int>> Handle(DeleteSaveByIdCommand request, CancellationToken cancellationToken)
            {

                var save = await _saveRepository.GetByIdAsync(request.Id);
                if (save == null) throw new ApiException($"Save Not Found.");
                await _saveRepository.DeleteAsync(save);
                return new Response<int>(save.Id);
            }
        }
    }

  
}
