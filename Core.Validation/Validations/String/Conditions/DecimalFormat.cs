using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.String.Conditions
{
    public class DecimalFormat : IStringCondition
    {
        public decimal OutDecimal { get => this.outDecimal; private set => this.outDecimal = value; }

        public bool IsCorrect { get; set; }

        private decimal outDecimal;

        public bool Execute(string value)
        {
            this.IsCorrect = decimal.TryParse(value, out this.outDecimal);
            return IsCorrect;
        }
    }
}
