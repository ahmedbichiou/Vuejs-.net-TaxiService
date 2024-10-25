using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
namespace GraphQLMongoDBDemo.Models
{
    public class Client
    {
        [BsonId]  // Custom primary key
        public string Email { get; set; }

        public string Name { get; set; }
        public string Surname { get; set; }
        public string phone { get; set; }
      
        public List<string> Transfers { get; set; } = new List<string>();
    }
}
