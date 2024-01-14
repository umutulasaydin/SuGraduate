using GradApp.Entities.Courses;
using GradApp.Entities.Input;
using GradApp.Entities.Requirements;
using GradApp.Entities.Result;
using GradApp.Functions;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Driver;


namespace GradApp.Controllers
{
    [Route("")]
    [ApiController]
    public class RequirementController : ControllerBase
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;
        private readonly IMongoDatabase database;
        private readonly Calculations calculations;
        public RequirementController(IDbConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
            database = _dbConnectionFactory.CreateConnection();
            calculations = new Calculations();
        }

        [HttpGet("Courses")]
        public async Task<List<Course>> Get()
        {
            IMongoCollection<CourseList> collection = database.GetCollection<CourseList>("Requirements");
            FilterDefinition<CourseList> filter = Builders<CourseList>.Filter.Exists("Courses");
            CourseList result = await collection.Find(filter).FirstAsync();
            return result.Courses;
        }


        [HttpPost("Control")]
        public async Task<ResultList> Control(Input request)
        {
            ResultList result = new ResultList();
            result.EntryYear = request.EntryYear.ToString();
            IMongoCollection<ProgramRequirement> collection = database.GetCollection<ProgramRequirement>("Requirements");
            foreach (string item in request.Programs)
            {
                try
                {
                    string filter_name = item.Substring(2) + "_" + request.EntryYear;
                    FilterDefinition<ProgramRequirement> filter = Builders<ProgramRequirement>.Filter.Eq("ProgramCode", filter_name);
                    ProgramRequirement requirements = await collection.Find(filter).FirstAsync();
                    Result resultProgram = new Result();
                    resultProgram.Program = item;
                    if (item.Substring(0, 2) == "BS")
                    {
                        resultProgram.CreditResults = calculations.CalculateFENS(requirements, request.Courses);
                    }
                    result.results.Add(resultProgram);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
                
            }
            return result;

        }
    }
}
