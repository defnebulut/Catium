using CleanArchitecture.Core.DTOs.Account;
using CleanArchitecture.Core.Features.Users.Commands.DeleteUserCommand;
using CleanArchitecture.Core.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CleanArchitecture.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateAsync(AuthenticationRequest request)
        {
            return Ok(await _accountService.AuthenticateAsync(request, GenerateIPAddress()));
        }
        [HttpPost("portal-login")]
        public async Task<IActionResult> PortalLoginAsync(AuthenticationRequest request)
        {
            return Ok(await _accountService.PortalLoginAsync(request, GenerateIPAddress()));
        }
        [HttpPost("create-admin")]
        public async Task<IActionResult> CreateAdminAsync(RegisterRequest request)
        {
            var origin = Request.Headers["origin"];
            return Ok(await _accountService.CreateAdminAsync(request, origin));
        }
        [HttpPost("create-super-admin")]
        public async Task<IActionResult> CreateSuperAdminAsync(RegisterRequest request)
        {
            var origin = Request.Headers["origin"];
            return Ok(await _accountService.CreateSuperAdminAsync(request, origin));
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegisterRequest request)
        {
            var origin = Request.Headers["origin"];
            return Ok(await _accountService.RegisterAsync(request, origin));
        }
        [HttpGet("admin")]
        public async Task<IActionResult> GetAllAdminsAsync()
        {

            return Ok(await _accountService.GetAllAdminsAsync());
        }
        [HttpGet("superadmin")]
        public async Task<IActionResult> GetAlSuperAdminsAsync()
        {

            return Ok(await _accountService.GetAlSuperAdminsAsync());
        }
        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmailAsync([FromQuery] string userId, [FromQuery] string code)
        {
            var origin = Request.Headers["origin"];
            return Ok(await _accountService.ConfirmEmailAsync(userId, code));
        }
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest model)
        {
            await _accountService.ForgotPassword(model, Request.Headers["origin"]);
            return Ok();
        }
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest model)
        {

            return Ok(await _accountService.ResetPassword(model));
        }
        [HttpDelete("admin-delete")]
        public async Task<IActionResult> DeleteAdmin(string adminId)
        {

            await _accountService.DeleteAdmin(adminId);
            return Ok();
        }
        [HttpDelete("superadmin-delete")]
        public async Task<IActionResult> DeleteSuperAdmin(string superadminId)
        {

            await _accountService.DeleteSuperAdmin(superadminId);
            return Ok();
        }
        private string GenerateIPAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }
    }
}