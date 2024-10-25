using MongoDB.Bson.Serialization.Attributes;

namespace GraphQLMongoDBDemo.Models
{
    public class Agent
    {
        [BsonId]  // Custom primary key
        public string Id { get; set; }

        public string Name { get; set; }
        public string Surname { get; set; }
        public string Number { get; set; }
    }
}
