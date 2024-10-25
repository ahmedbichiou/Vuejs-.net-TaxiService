namespace GraphQLMongoDBDemo.GraphQL.InputTypes
{
    public class TransferInput
    {
        public string Start { get; set; }
        public string End { get; set; }
        public double Price { get; set; }
        public string ClientEmail { get; set; }
        public string? AgentId { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string Description { get; set; }
    }
}
