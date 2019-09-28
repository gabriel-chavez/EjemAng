using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.StringList
{
    public class StringListValidation<CONDITION> : BaseValidation<List<string>, CONDITION>
        where CONDITION : IStringListCondition, new()
    {
        public StringListValidation(List<string> value, string errorMessage, string field = null) 
            : base(value, errorMessage, field)
        {

        }
    }
}
