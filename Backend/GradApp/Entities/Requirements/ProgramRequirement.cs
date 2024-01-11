using MongoDB.Bson;

namespace GradApp.Entities.Requirements
{
    public class ProgramRequirement
    {
        public ObjectId _id { get; set; }
        public List<Credit> Credits { get; set; }
        public string ProgramCode { get; set; }
        public List<Requirement> Requirements { get; set; }
    }
}
