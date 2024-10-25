using GraphQLMongoDBDemo.Data;
using GraphQLMongoDBDemo.GraphQL.Services;
using GraphQLMongoDBDemo.GraphQL.Types;
using GraphQLMongoDBDemo.GraphQL;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace GraphQLMongoDBDemo
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            // Add CORS services
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            // Add MongoDbContext and other services
            services.AddSingleton<MongoDbContext>();
            services.AddSingleton<TransferService>();
            services.AddSingleton<ClientService>();
            services.AddSingleton<AgentService>();

            // Add GraphQL services
            services.AddGraphQLServer()
                .AddQueryType<Query>()
                .AddMutationType<Mutation>()
                .AddType<TransferType>()
                .AddType<ClientType>()
                .AddType<AgentType>();
        }

        public void Configure(IApplicationBuilder app)
        {
            // Enable CORS globally with the "AllowAll" policy
            app.UseCors("AllowAll");

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGraphQL();
            });
        }
    }
}
