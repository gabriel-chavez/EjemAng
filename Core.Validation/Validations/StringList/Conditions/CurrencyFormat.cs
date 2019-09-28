using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.StringList.Conditions
{
    public class CurrencyFormat : IStringListCondition
    {
        public bool Execute(List<string> value)
        {
            bool isValid = true;
            if (value != null)
            {
                foreach (var item in value)
                {
                    if (item != "BOL" && item != "USD")
                    {
                        isValid = false;
                        break;
                    }
                }
            }
            else
            {
                isValid = true;
            }

            return isValid;
        }
    }
}
