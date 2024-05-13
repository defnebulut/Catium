using CleanArchitecture.Core.DTOs.Account;
using CleanArchitecture.Core.Wrappers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CleanArchitecture.Core.Interfaces
{
    public interface IAccountService
    {
        Task<Response<AuthenticationResponse>> AuthenticateAsync(AuthenticationRequest request, string ipAddress);
        Task<Response<AuthenticationResponse>> PortalLoginAsync(AuthenticationRequest request, string ipAddress);
        Task<Response<string>> CreateAdminAsync(RegisterRequest request, string origin);
        Task<Response<string>> CreateSuperAdminAsync(RegisterRequest request, string origin);
        Task<Response<string>> RegisterAsync(RegisterRequest request, string origin);
        Task<Response<string>> ConfirmEmailAsync(string userId, string code);
        Task ForgotPassword(ForgotPasswordRequest model, string origin);
        Task<Response<string>> ResetPassword(ResetPasswordRequest model);
        Task<Response<IEnumerable<Info>>> GetAllAdminsAsync();
        Task<Response<IEnumerable<Info>>> GetAlSuperAdminsAsync();

        Task DeleteAdmin(string adminId);

        Task DeleteSuperAdmin(string superadminId);


    }
}
