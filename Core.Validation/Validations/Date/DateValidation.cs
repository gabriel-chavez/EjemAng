namespace BCP.CredinetWeb.Core.Validation.Validations.Date
{
    using System;

    public class DateValidation<CONDITION> : BaseValidation<DateTime, CONDITION>
        where CONDITION : IDateCondition, new()
    {
        public DateValidation(DateTime value, string errorMessage, string field = null) : 
            base(value, errorMessage, field)
        {
        }
    }
}
