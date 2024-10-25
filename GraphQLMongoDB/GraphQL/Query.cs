using GraphQLMongoDBDemo.Data;
using GraphQLMongoDBDemo.Models;
using MongoDB.Driver;

namespace GraphQLMongoDBDemo.GraphQL
{
    public class Query
    {
        public async Task<IEnumerable<Transfer>> GetTransfers([Service] MongoDbContext context) =>
            await context.Transfers.Find(_ => true).ToListAsync();

        public async Task<Transfer> GetTransfer(string id, [Service] MongoDbContext context) =>
            await context.Transfers.Find(t => t.Id == id).FirstOrDefaultAsync();

        // Similar methods for Client and Agent
    }
}
