using GradApp.Entities.Requirements;

namespace GradApp.Entities.Result
{
    public class Result
    {
        public string Program { get; set; }
        public List<CreditResult> CreditResults { get; set; }

        public Result()
        {
            CreditResults = new List<CreditResult>();
        }
    }
}
