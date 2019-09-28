namespace BCP.CredinetWeb.Core.AuthConfig.DotNetFramework
{
    using BCP.CredinetWeb.Core.Encrypter;
    using System.Configuration;
    using System.Web.Http;
    using System.Web.Http.Controllers;

    public class AuthorizeWithKeyAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (!IsAuthorized(actionContext))
            {
                HandleUnauthorizedRequest(actionContext);
            }
        }

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            return EncrypterManager.DecryptString(actionContext.Request.Headers.Authorization?.Parameter, ConfigurationManager.AppSettings["ThumbPrint"]) == ConfigurationManager.AppSettings["Key"];
        }
    }
}
