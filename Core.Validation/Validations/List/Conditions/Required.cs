namespace BCP.CredinetWeb.Validation.Validations.List.Conditions    
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;


    public class Required<T> : IListCondition<T>
    {
        public bool Execute(List<T> value)
        {
            return value != null && value.Count > 0;
        }
    }
}
