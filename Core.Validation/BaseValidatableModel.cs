using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
namespace BCP.CredinetWeb.Core.Validation
{
    using System.Threading.Tasks;

    public abstract class BaseValidatableModel<VALIDATOR, MODEL> : IValidatableObject
        where VALIDATOR : BaseValidator<MODEL>, new()
    {
        public BaseValidatableModel() => this.validator = new VALIDATOR();

        public VALIDATOR validator;

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            this.validator.Data = this.GetThis();
            this.validator.valid();
            return this.validator.ErrorMessagesWithFields;
        }

        protected abstract MODEL GetThis();
    }
}
