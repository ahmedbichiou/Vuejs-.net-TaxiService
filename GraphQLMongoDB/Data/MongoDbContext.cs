using GraphQLMongoDBDemo.Models;
using MongoDB.Driver;

namespace GraphQLMongoDBDemo.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MongoDb"));
            _database = client.GetDatabase("Tasks");
        }

        public IMongoCollection<Transfer> Transfers => _database.GetCollection<Transfer>("transfer");
        public IMongoCollection<Client> Clients => _database.GetCollection<Client>("client");
        public IMongoCollection<Agent> Agents => _database.GetCollection<Agent>("agent");
    }
}
