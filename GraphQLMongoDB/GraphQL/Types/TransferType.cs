using GraphQLMongoDBDemo.Models;

namespace GraphQLMongoDBDemo.GraphQL.Types
{
    public class TransferType : ObjectType<Transfer>
    {
        protected override void Configure(IObjectTypeDescriptor<Transfer> descriptor)
        {
            descriptor.Field(t => t.Id).Type<NonNullType<StringType>>();
            descriptor.Field(t => t.Start).Type<StringType>();
            descriptor.Field(t => t.End).Type<StringType>();
            descriptor.Field(t => t.Price).Type<FloatType>();
            descriptor.Field(t => t.ClientEmail).Type<StringType>();
            descriptor.Field(t => t.AgentId).Type<StringType>();
            descriptor.Field(t => t.Date).Type<DateTimeType>();
            descriptor.Field(t => t.Time).Type<StringType>();
            descriptor.Field(t => t.Description).Type<StringType>();
        }
    }
}
