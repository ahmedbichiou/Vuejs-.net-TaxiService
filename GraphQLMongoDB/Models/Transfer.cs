using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
namespace GraphQLMongoDBDemo.Models
{
    public class Transfer
    {
        [BsonId]  // Indicates this field is the primary key
        public string Id { get; set; }

        public string Start { get; set; }
        public string End { get; set; }
        public double Price { get; set; }

        public string ClientEmail { get; set; }
        public string AgentId { get; set; }

        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string Description { get; set; }
    }

}