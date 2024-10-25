using GraphQLMongoDBDemo.Data;
using GraphQLMongoDBDemo.GraphQL.InputTypes;
using GraphQLMongoDBDemo.Models;
using MongoDB.Driver;

namespace GraphQLMongoDBDemo.GraphQL
{
    public class Mutation
    {
        // Method to create a transfer
        public async Task<Transfer> CreateTransfer(TransferInput input, [Service] MongoDbContext context)
        {
            // Check if the client exists
            var client = await context.Clients.Find(c => c.Email == input.ClientEmail).FirstOrDefaultAsync();

            // If the client does not exist, create a new one
            if (client == null)
            {
                client = new Client
                {
                    Email = input.ClientEmail,
                };

                await context.Clients.InsertOneAsync(client);
            }

            // Create a new transfer, without assigning an agent initially
            var transfer = new Transfer
            {
                Id = Guid.NewGuid().ToString(),
                Start = input.Start,
                End = input.End,
                Price = input.Price,
                ClientEmail = client.Email,
                Date = input.Date,
                Time = input.Time,
                Description = input.Description,
                AgentId = null // No agent assigned yet
            };

            await context.Transfers.InsertOneAsync(transfer);

            // Also, add this transfer to the client's transfer array
            var update = Builders<Client>.Update.Push(c => c.Transfers, transfer.Id);
            await context.Clients.UpdateOneAsync(c => c.Email == client.Email, update);

            return transfer;
        }

        // Method to assign an agent to an existing transfer
        public async Task<Transfer> AssignAgentToTransfer(string transferId, string agentId, [Service] MongoDbContext context)
        {
            // Find the agent
            var agent = await context.Agents.Find(a => a.Id == agentId).FirstOrDefaultAsync();
            if (agent == null)
            {
                throw new Exception("Agent not found");
            }

            // Find the transfer
            var transfer = await context.Transfers.Find(t => t.Id == transferId).FirstOrDefaultAsync();
            if (transfer == null)
            {
                throw new Exception("Transfer not found");
            }

            // Assign the agent to the transfer
            transfer.AgentId = agent.Id;
            var update = Builders<Transfer>.Update.Set(t => t.AgentId, agent.Id);

            await context.Transfers.UpdateOneAsync(t => t.Id == transferId, update);

            return transfer;
        }

        // Method to create a client
        public async Task<Client> CreateClient(ClientInput input, [Service] MongoDbContext context)
        {
            // Check if the client already exists using the email as the identifier
            var existingClient = await context.Clients.Find(c => c.Email == input.Email).FirstOrDefaultAsync();

            // If the client exists, return the existing client
            if (existingClient != null)
            {
                return existingClient;
            }

            // If the client does not exist, create a new one
            var newClient = new Client
            {
                Email = input.Email, // Use email as the primary key
                Name = input.Name,
                Surname = input.Surname,
                phone = input.phone,
            };

            await context.Clients.InsertOneAsync(newClient);
            return newClient;
        }

        // Method to create an agent
        public async Task<Agent> CreateAgent(AgentInput input, [Service] MongoDbContext context)
        {
            var agent = new Agent
            {
                Id = Guid.NewGuid().ToString(),
                Name = input.Name,
                Surname = input.Surname,
                Number = input.Number
            };

            await context.Agents.InsertOneAsync(agent);
            return agent;
        }
    }
}
