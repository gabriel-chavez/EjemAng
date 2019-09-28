using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCP.CredinetWeb.Core.Validation.Validations.String.Conditions
{
    public enum TypeCountCharacters
    {
        May = 1,
        Min = -1,
        Equal = 0
    }

    public class CountCharacters : IStringCondition
    {
        public CountCharacters() { }

        public CountCharacters(char character, TypeCountCharacters type, int valueCompare)
        {
            this.character = character;
            this.type = type;
            this.valueCompare = valueCompare;
        }

        private int valueCompare;

        private char character;

        private TypeCountCharacters type;

        public bool Execute(string value)
        {
            var resultCompare = value.Count(c => c == character).CompareTo(this.valueCompare);
            return (int)type == resultCompare;
        }
    }
}
