using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.Integer.Conditions
{
    public class IntRequired : IIntegerCondition
    {
        public bool Execute(int value)
        {
            return value != 0;
        }
    }
}
