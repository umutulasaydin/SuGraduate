using GradApp.Entities.Requirements;
using MongoDB.Bson;

namespace GradApp.Entities.Courses
{
    public class CourseList
    {
        public ObjectId _id { get; set; }
        public List<Course> Courses { get; set; }
    }
}
