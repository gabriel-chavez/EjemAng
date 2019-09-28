namespace BCP.CredinetWeb.Core.Validation.Validations.String.Conditions
{
    public class StregthPassword : IStringCondition
    {
        public StregthPassword() => score = 0;

        private const int MIN_LENGTH = 3;

        private const int MAX_LENGTH = 20;

        private const string PATTERN_UPPER = "(.*[A-Z])";

        private const string PATTERN_LOWER = "([a-z])";

        private const string PATTERN_NUMBER = "(.*[0-9])";

        //private const string PATT

        private int score;
        public bool Execute(string value)
        {
            if(value.Length < MIN_LENGTH || value.Length > MAX_LENGTH)
            {
                return false;
            }

            this.score += value.Length * 4;
            this.score += this.checkRepetition(1, value) - value.Length;
            this.score += this.checkRepetition(2, value) - value.Length;
            this.score += this.checkRepetition(3, value) - value.Length;
            this.score += this.checkRepetition(4, value) - value.Length;

            //if(Regex.IsMatch())

            return true;
        }

        private int checkRepetition(int pLen, string password)
        {
            var res = "";
            for (var i = 0; i < password.Length; i++)
            {
                var repeated = true;
                var j = 0;
                for (j = 0; j < pLen && (j + i + pLen) < password.Length; j++)
                {
                    repeated = repeated && (password[j + i] == password[j + i + pLen]);
                }
                if (j < pLen)
                {
                    repeated = false;
                }
                if (repeated)
                {
                    i += pLen - 1;
                    repeated = false;
                }
                else
                {
                    res += password[i];
                }
            }
            return res.Length;
        }
    }
}
