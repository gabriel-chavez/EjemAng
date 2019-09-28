using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation
{
    public interface IValidator<T>
        //where T : IValidatableModel
    {
        //bool Valid(T data);
        T Data { get; set; }

        bool valid();

        List<string> ErrorMessages { get; }        
    }
    
    public interface IValidatorWithFields<T> : IValidator<T>
        //where T : IValidatableModel
    {
        List<ValidationResult> ErrorMessagesWithFields { get; }
    }
}
