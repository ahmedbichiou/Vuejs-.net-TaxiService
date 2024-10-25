using GraphQLMongoDBDemo.Models;

namespace GraphQLMongoDBDemo.GraphQL.Types
{
    public class AgentType : ObjectType<Agent>
    {
        protected override void Configure(IObjectTypeDescriptor<Agent> descriptor)
        {
            descriptor.Field(a => a.Id).Type<NonNullType<StringType>>();
            descriptor.Field(a => a.Name).Type<StringType>();
            descriptor.Field(a => a.Surname).Type<StringType>();
            descriptor.Field(a => a.Number).Type<StringType>();
        }
    }
}
