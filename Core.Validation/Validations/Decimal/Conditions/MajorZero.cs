using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.Decimal.Conditions
{
    public class MajorZero : IDecimalCondition
    {
        public bool Execute(decimal value)
        {
            return value > 0;
        }
    }
}
