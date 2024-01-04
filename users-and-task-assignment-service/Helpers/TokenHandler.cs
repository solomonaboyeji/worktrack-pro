using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using JobTrackPro.Models; // Import the IConfiguration namespace

namespace JobTrackPro.Helpers
{
    public class TokenHandler
    {
        private readonly IConfiguration _configuration;

        public TokenHandler(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string SecretKey => _configuration["Jwt:SecretKey"] ?? "DefaultSecret";
        private string issuer => _configuration["Jwt:Issuer"] ?? "Default";

        private SymmetricSecurityKey SecurityKey => new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));


        public string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim("id", user.id.ToString()),
                new Claim("email", user.email.ToString()),
                new Claim("lastName", user.last_name.ToString()),
                new Claim("firstName", user.first_name.ToString()),
                new Claim("createdAt", user.created_at.ToString()), // Custom claim for createdAt
                new Claim("isEnabled", user.is_enabled.ToString()),
                new Claim("isVerified", user.is_verified.ToString()),
                new Claim("isLegalStatus", user.is_legal_status.ToString()),
                new Claim("starTime", user.start_time.ToString()),
                new Claim("dob", user.dob.ToString()),
                new Claim("phoneNumber", user.phone_number.ToString()),
                new Claim("postCode", user.post_code.ToString()),
                new Claim("role", user.role.ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Issuer = issuer,
                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                SigningCredentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }

}
