using GraphQLMongoDBDemo.Data;
using GraphQLMongoDBDemo.Models;
using MongoDB.Driver;

namespace GraphQLMongoDBDemo.GraphQL.Services
{
    public class TransferService
    {
        private readonly MongoDbContext _context;

        public TransferService(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Transfer>> GetAllTransfersAsync() =>
            await _context.Transfers.Find(_ => true).ToListAsync();

        public async Task<Transfer> GetTransferByIdAsync(string id) =>
            await _context.Transfers.Find(t => t.Id == id).FirstOrDefaultAsync();

        public async Task CreateTransferAsync(Transfer transfer) =>
            await _context.Transfers.InsertOneAsync(transfer);

        // Update and Delete methods...
    }
}
