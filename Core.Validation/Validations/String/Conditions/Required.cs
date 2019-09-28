using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.String.Conditions
{
    public class Required : IStringCondition
    {
        public bool Execute(string value)
        {
            return !string.IsNullOrEmpty(value);
        }
    }
}
