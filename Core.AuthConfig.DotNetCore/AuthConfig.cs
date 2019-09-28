namespace BCP.CredinetWeb.Core.AuthConfig.DotNetCore
{
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.Owin.Security.DataHandler.Encoder;

    public class AuthConfig : IAuthConfig
    {
        private AuthConfig(IServiceCollection services, IConfiguration configuration)
        {
            this.services = services;
            this.configuration = configuration;
        }

        public static AuthConfig Configure(IServiceCollection services, IConfiguration configuration)
        {
            var _this = new AuthConfig(services, configuration);
            _this.Configure();
            return _this;
        }

        public IServiceCollection services { get; set; }

        public IConfiguration configuration { get; set; }

        public void Configure()
        {
            var key = configuration.GetSection("JwtAuth:key").Value;
            var audience = configuration.GetSection("JwtAuth:audience").Value;
            var issuer = configuration.GetSection("JwtAuth:issuer").Value;
            var symetricKey = TextEncodings.Base64Url.Decode(key);
            var secret = new SymmetricSecurityKey(symetricKey);
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateActor = false,
                ValidateLifetime = true,
                IssuerSigningKey = secret,
                ValidAudience = audience,
                ValidIssuer = issuer
            };

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(o =>
                {
                    o.TokenValidationParameters = tokenValidationParameters;
                });

            services.AddAuthorization(o => { o.DefaultPolicy = new Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme).RequireAuthenticatedUser().Build(); });
        }
    }
}
