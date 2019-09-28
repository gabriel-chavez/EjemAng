using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.String.Conditions
{
    public class MaxLength : IStringCondition
    {
        public MaxLength() { }

        public MaxLength(int length)
        {
            this.Length = length;
        }

        public int Length { get; set; }

        public bool Execute(string value)
        {
            return value.Length <= this.Length;
        }
    }
}
