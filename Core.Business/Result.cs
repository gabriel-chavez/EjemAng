using System;

namespace BCP.CredinetWeb.Core.Business
{
    public class Result<BODY>
    {
        private Result()
        {
            IsOk = true;
            Message = null;
        }

        private Result(BODY body) : this() => Body = body;

        private Result(string message, bool isOk) : this()
        {
            Message = message;
            IsOk = isOk;
        }

        public bool IsOk { get; private set; }

        public string Message { get; private set; }

        public BODY Body { get; private set; }

        public static Result<BODY> SetOk(BODY body)
        {
            var result = new Result<BODY>(body);
            return result;
        }

        public static Result<BODY> SetError(string message)
        {
            var result = new Result<BODY>(message, false);
            return result;
        }

    }
}
