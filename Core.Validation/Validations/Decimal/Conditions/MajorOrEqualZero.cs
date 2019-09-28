namespace BCP.CredinetWeb.Core.Validation.Validations.Decimal.Conditions
{
    public class MajorOrEqualZero : IDecimalCondition
    {
        public bool Execute(decimal value)
        {
            return value >= 0;
        }
    }
}
