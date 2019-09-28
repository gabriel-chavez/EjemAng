namespace BCP.CredinetWeb.Core.Validation
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public abstract class BaseValidator<T> : IValidatorWithFields<T>    
    {
        public List<string> ErrorMessages => this.errorMessages;

        private List<string> errorMessages;

        public T Data { get; set; }

        protected abstract List<IValidation> RulesValidate { get; }

        public List<ValidationResult> ErrorMessagesWithFields => this.errorMessagesWithFields;

        protected List<ValidationResult> errorMessagesWithFields;

        public virtual bool valid()
        {
            bool isValid = true;
            this.errorMessages = new List<string>();
            this.errorMessagesWithFields = new List<ValidationResult>();

            foreach (var validation in this.RulesValidate)
            {
                if (!validation.Validate())
                {
                    this.errorMessages.Add(validation.ErrorMessage);
                    this.errorMessagesWithFields.Add(new ValidationResult(validation.ErrorMessage, new[] { validation.Field }));
                    isValid = false;
                }
            }

            return isValid;
        }
    }
}
