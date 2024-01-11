using System.Text.Json.Serialization;

namespace GradApp.Entities.Courses
{
    public class Condition
    {
        public List<object> prerequisite { get; set; }
        public List<int> general { get; set; }
    }
}
