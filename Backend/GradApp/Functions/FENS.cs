using GradApp.Entities.Courses;
using GradApp.Entities.Requirements;
using GradApp.Entities.Result;
using System.Linq;
using System.Linq.Expressions;

namespace GradApp.Functions
{
    public class Calculations
    {
        public List<CreditResult> CalculateFENS(ProgramRequirement requirements, List<string> courses)
        {
            List<CreditResult> result = new List<CreditResult>();
            Credit totalCredits = requirements.Credits.Where(x => x.Area == "Total").First();
            CreditResult totalCreditResult = new CreditResult(totalCredits.Area, totalCredits.SU_Credit, totalCredits.Min_Course, totalCredits.AKTS_Credit);

            for (int i = 0; i < requirements.Requirements.Count(); i++)
            {
                Credit credits = requirements.Credits.Where(x=>x.Area == requirements.Requirements[i].Area_Name).First();
                CreditResult creditResult = new CreditResult(credits.Area, credits.SU_Credit, credits.Min_Course, credits.AKTS_Credit);
                List<CourseInfo> courseList = requirements.Requirements[i].Courses;
                for (int k = 0; k < courseList.Count(); k++)
                {
                    if (courses.Contains(courseList[k].Course_Name))
                    {
                        if (creditResult.Success == true && (creditResult.Area == "Core Electives" || creditResult.Area == "Area Electives"))
                        {
                            requirements.Requirements[i + 1].Courses.Insert(0, courseList[k]);
                        }
                        else
                        {
                            creditResult.increaseTaken(courseList[k]);
                            if (creditResult.Area != "Basic Science" && creditResult.Area != "Engineering")
                            {
                                if (totalCreditResult.Min_Course != null)
                                {
                                    totalCreditResult.Taken_Course += 1;
                                }
                                if (totalCreditResult.SU_Credit != null)
                                {
                                    totalCreditResult.Taken_SU_Credit += courseList[k].SU_Credit;
                                }
                                if (totalCreditResult.AKTS_Credit != null)
                                {
                                    totalCreditResult.Taken_AKTS_Credit += courseList[k].AKTS_Credit;
                                }

                            }
                            
                        }
                    }
                    else
                    {
                        creditResult.increaseSuggested(courseList[k]);
                    }
                }
                result.Add(creditResult);
            }

            
                
            
            if (totalCreditResult.Min_Course >= totalCreditResult.Taken_Course && totalCreditResult.SU_Credit >= totalCreditResult.Taken_SU_Credit && totalCreditResult.AKTS_Credit >= totalCreditResult.Taken_AKTS_Credit)
            {
                totalCreditResult.Success = true;
            }
            result.Add(totalCreditResult);
            return result;
        }
    }
    
}
