﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation
{
    public interface ICondition<TYPE>
    {
        bool Execute(TYPE value);
    }
}
