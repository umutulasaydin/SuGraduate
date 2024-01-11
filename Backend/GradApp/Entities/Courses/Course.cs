namespace GradApp.Entities.Courses
{
    public class Course
    {
        public string course_name { get; set; }
        public string course_code { get; set; }
        public int credit { get; set; }
        public Condition condition { get; set; }
    }
}
