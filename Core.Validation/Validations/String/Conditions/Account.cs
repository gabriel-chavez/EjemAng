using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.String.Conditions
{
    public class Account //: IStringCondition
    {


        /* public bool Execute(string value)
         {
             switch (dto.DocumentType)
             {
                 case BaseConstants.FISCAL_ID:
                 case BaseConstants.RUN:
                     dto.DocumentExtension = "000";
                     break;
                 case BaseConstants.NIT:
                     var aux = dto.DocumentNumber.Substring(0, 3);
                     dto.DocumentExtension = aux;
                     break;
             }
             var accountClient = ((from clients in context.AccountClients
                                   where clients.FormattedAccount == dto.DestinationAccount &&
                                   clients.DocumentNumber == dto.DocumentNumber &&
                                   clients.DocumentType == dto.DocumentType &&
                                   clients.DocumentExtension == dto.DocumentExtension
                                   select clients));
             if (accountClient != null)
             {
                 IsValid = true;
             }
             else
             {
                 IsValid = false;
             }
             return IsValid;
         }
     }*/
    }
}
