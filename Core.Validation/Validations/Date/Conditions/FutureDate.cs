namespace BCP.CredinetWeb.Core.Validation.Validations.Date.Conditions
{
    using System;

    public class FutureDate : IDateCondition
    {
        public bool Execute(DateTime value)
        {
            return DateTime.Today < value;
        }
    }
}
