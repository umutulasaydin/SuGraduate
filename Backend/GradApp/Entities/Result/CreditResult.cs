using GradApp.Entities.Requirements;

namespace GradApp.Entities.Result
{
    public class CreditResult
    {
        public bool Success { get; set; }
        public string Area { get; set; }
        public int? SU_Credit { get; set; }
        public int? Min_Course { get; set; }
        public int? AKTS_Credit { get; set; }
        public int? Taken_SU_Credit { get; set; }
        public int? Taken_Course { get; set; }
        public int? Taken_AKTS_Credit { get; set; }
        public List<CourseInfo>? TakenCourses { get; set; }
        public List<CourseInfo>? SuggestedCourses { get; set; }

        public CreditResult(string area, int? su_credit, int? min_course, int? akts_credit)
        {
            Success = false;
            Area = area;
            SU_Credit = su_credit;
            Min_Course = min_course;
            AKTS_Credit = akts_credit;
            Taken_SU_Credit = su_credit==null ? null : 0;
            Taken_Course = min_course==null ? null : 0;
            Taken_AKTS_Credit = akts_credit==null ? null : 0;
            TakenCourses = new List<CourseInfo>();
            SuggestedCourses = new List<CourseInfo>();
        }

        public void increaseTaken(CourseInfo course)
        {
            if (Min_Course != null)
            {
                Taken_Course++;
            }
            else if (SU_Credit != null)
            {
                Taken_SU_Credit += course.SU_Credit;
            }
            else if (AKTS_Credit != null)
            {
                Taken_AKTS_Credit += course.AKTS_Credit;
            }
            TakenCourses.Add(course);

            if ((Min_Course == null || (Min_Course != null && Taken_Course >= Min_Course)) && 
                (SU_Credit == null || (SU_Credit != null && Taken_SU_Credit >= SU_Credit)) && 
                (AKTS_Credit == null || (AKTS_Credit != null && Taken_AKTS_Credit >= AKTS_Credit)))
            {
                Success = true;
                SuggestedCourses.Clear();
            }
        }

        public void increaseSuggested(CourseInfo course)
        {
            if (Success == false)
            {
                SuggestedCourses.Add(course);
            }
        }

    }
}
