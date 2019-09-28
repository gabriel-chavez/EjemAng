namespace BCP.CredinetWeb.Core.AuthConfig
{
    using System.Security.Claims;
    using System.Security.Principal;

    public static class CustomClaimTypes
    {
        public const string CompanyId = "company_id";
        public const string CompanyName = "company_name";
        public const string CompanyState = "company_state";
        public const string ControllerScheme = "controller_scheme";
        public const string UserType = "user_type";
        public const string UserName = "user_name";
        public const string UserDocumentNumber = "user_document_number";
        public const string UserDocumentType = "user_document_type";
        public const string UserDocumentExtension = "user_document_extension";
        public const string IsSignature = "is_signature";
        public const string ExchangeBuy = "exchange_buy";
        public const string ExchangeSale = "exchange_sale";
        public const string AuthorizePin = "authorize_pin";
        public const string AuthorizeOperation = "authorize_operation";
        public const string AuthorizeFtp = "authorize_ftp";
    }

    public static class IdentityExtensions
    {
        public static int GetCompanyId(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.CompanyId);
            if (claimValue == null)
                return -1;

            return claimValue == null ? 0 : int.Parse(claimValue);
        }

        public static string GetCompanyName(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.CompanyName);
            return claimValue;
        }

        public static bool GetCompanyState(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.CompanyState);

            return int.Parse(claimValue) == 1;
        }

        public static bool GetControllerScheme(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.ControllerScheme);
            if (claimValue == null)
                return false;
            return bool.Parse(claimValue);
        }

        public static string GetUserType(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.UserType);
            return claimValue;
        }

        public static string GetFullUserName(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.UserName);
            return claimValue;
        }
        public static string GetDocumentNumber(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.UserDocumentNumber);
            return claimValue;
        }

        public static string GetDocumentType(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.UserDocumentType);
            return claimValue;
        }

        public static string GetDocumentExtension(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.UserDocumentExtension);
            return claimValue;
        }

        public static bool GetIsSignature(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.IsSignature);
            return bool.Parse(claimValue);
        }

        public static string GetExchangeBuy(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.ExchangeBuy);
            return claimValue;
        }

        public static string GetExchangeSale(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.ExchangeSale);
            return claimValue;
        }

        public static string GetAuthorizePin(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.AuthorizePin);
            return claimValue;
        }

        public static bool GetIsAuthorizeOperation(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.AuthorizeOperation);
            return bool.Parse(claimValue);
        }

        public static bool GetIsAuthorizeFtp(this IIdentity identity)
        {
            var claimValue = GetClaim(identity, CustomClaimTypes.AuthorizeFtp);
            return bool.Parse(claimValue);
        }

        private static string GetClaim(this IIdentity identity, string customClaim)
        {
            ClaimsIdentity claimsIdentity = identity as ClaimsIdentity;
            Claim claim = claimsIdentity?.FindFirst(customClaim);
            return claim.Value;
        }
    }
}
