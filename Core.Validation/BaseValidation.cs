namespace BCP.CredinetWeb.Core.Validation
{
    public abstract class BaseValidation<T, CONDITION> : IValidation
        where CONDITION : ICondition<T>, new()
    {
        public BaseValidation(T value, string errorMessage, string field = null)
            : this(value, errorMessage, new CONDITION(), field)
        {
        }

        public BaseValidation(T value, string errorMessage, CONDITION condition, string field = null)
        {
            this.Value = value;
            this.errorMessage = errorMessage;
            this.condition = condition;
            this.field = field;            
        }

        public T Value { get; set; }

        protected CONDITION condition;

        protected string errorMessage;

        private string field { get; set; }

        public string ErrorMessage => this.errorMessage;

        public string Field => this.field;

        public virtual bool Validate()
        {
            return this.condition.Execute(this.Value);
        }
    }
}
