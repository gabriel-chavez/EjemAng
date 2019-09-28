using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.String
{
    public class StringValidation<CONDITION> : BaseValidation<string, CONDITION>
        where CONDITION : IStringCondition, new()
    {
        public StringValidation(string value, string errorMessage, string field = null)
            : base(value, errorMessage, field)
        { }

        public StringValidation(string value, string errorMessage, CONDITION customCondition, string field = null)
            : base(value, errorMessage, customCondition, field)
        {

        }
    }
}
