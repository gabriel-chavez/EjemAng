using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.String.Conditions
{
    public class AccountFormat : IStringCondition
    {
        private const string ACCOUNT_PATTERN = @"^(\d{3}-\d{7,8}-\d-\d\d)|(\d{13,14})$";

        public bool Execute(string value)
        {
            return Regex.IsMatch(value, ACCOUNT_PATTERN);
        }
    }
}
