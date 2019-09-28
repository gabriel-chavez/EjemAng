using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.Integer
{
    public class IntegerValidation<CONDITION> : BaseValidation<int, CONDITION>
        where CONDITION : IIntegerCondition, new()
    {
        public IntegerValidation(int value, string errorMessage, string field = null) : base(value, errorMessage, field)
        {

        }
    }
}
