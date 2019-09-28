using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation
{
    public interface IValidation
    {
        bool Validate();

        string ErrorMessage { get; }

        string Field { get; }
    }
}
