using BCP.CredinetWeb.Core.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Validation.Validations.List
{
    public class ListValidation<CONDITION, T> : BaseValidation<List<T>, CONDITION>
        where CONDITION : IListCondition<T>, new()
    {
        public ListValidation(List<T> value, string errorMessage, string field = null)
            : base(value, errorMessage, field)
        {
        }
    }
}
