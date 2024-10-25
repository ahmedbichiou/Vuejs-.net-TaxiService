using GraphQLMongoDBDemo.Models;

namespace GraphQLMongoDBDemo.GraphQL.Types
{
    public class ClientType : ObjectType<Client>
    {
        protected override void Configure(IObjectTypeDescriptor<Client> descriptor)
        {
            descriptor.Field(c => c.Email).Type<NonNullType<StringType>>();
            descriptor.Field(c => c.Name).Type<StringType>();
            descriptor.Field(c => c.Surname).Type<StringType>();
            descriptor.Field(c => c.phone).Type<StringType>();
            descriptor.Field(c => c.Transfers).Type<ListType<StringType>>();
        }
    }
}
