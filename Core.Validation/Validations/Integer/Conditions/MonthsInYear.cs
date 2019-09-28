namespace BCP.CredinetWeb.Core.Validation.Validations.Integer.Conditions
{
    public class MonthsInYear : IIntegerCondition
    {
        public bool Execute(int value)
        {
            return value <= 12;
        }
    }
}
