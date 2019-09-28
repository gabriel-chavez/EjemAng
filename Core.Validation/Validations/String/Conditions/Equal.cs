using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.String.Conditions
{
    public class Equal : IStringCondition
    {
        public Equal() { }

        public Equal(string otherValue)
        {
            this.otherValue = otherValue;
        }

        private string otherValue;

        public bool Execute(string value)
        {
            return value == otherValue;
        }
    }
}
