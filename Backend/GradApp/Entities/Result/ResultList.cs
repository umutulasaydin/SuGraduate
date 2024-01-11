namespace GradApp.Entities.Result
{
    public class ResultList
    {
        public string EntryYear { get; set; }
        public List<Result> results { get; set; }

        public ResultList() 
        {
            results = new List<Result>();
        }
    }
}
