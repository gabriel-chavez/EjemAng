using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.Decimal
{
    public class DecimalValidation<CONDITION> : BaseValidation<decimal, CONDITION>
        where CONDITION : IDecimalCondition, new()
    {
        public DecimalValidation(decimal value, string message, bool isCorrect = true)
            : base(value, message)
        {
            this.isCorrect = isCorrect;
        }

        //public DecimalValidation(string value, string errorMessage, CONDITION customCondition, string field = null)
        //    : base(value, errorMessage, field)
        //{ }

        private bool isCorrect;

        public override bool Validate()
        {
            return this.isCorrect ? base.Validate() : true;
        }
    }
}
