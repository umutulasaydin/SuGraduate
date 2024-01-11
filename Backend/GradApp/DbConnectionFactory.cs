using MongoDB.Bson;
using MongoDB.Driver;


namespace GradApp
{
    public interface IDbConnectionFactory
    {
        IMongoDatabase CreateConnection();
    }
    public class DbConnectionFactory : IDbConnectionFactory
    {
        string connectionString = "mongodb+srv://umutulas:Umut6262@cluster0.nfluwpq.mongodb.net/?retryWrites=true&w=majority";
        public IMongoDatabase CreateConnection()
        {
            var client = new MongoClient(connectionString);
            return client.GetDatabase("SABANCIGRADUATIONAPP");
        }
    }
}
