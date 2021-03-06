const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { GraphQLScalarType } = require('graphql');
const { Kind, parseValue } = require('graphql/language');


let aboutMessage = "Issue Tracker API v1.0";

const issuesDB = [{
        id: 1,
        status: 'New',
        owner: 'Ravan',
        effort: '5',
        created: new Date('2018-05-16'),
        due: undefined,
        title: 'Error in console when clicking Add'
    },
    {
        id: 2,
        status: 'Assigned',
        owner: 'Eddie',
        effort: '14',
        created: new Date('2018-08-03'),
        due: new Date('2018-08-22'),
        title: 'Missing bottom border on panel'
    }

];

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A date() type in GraphQL as a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        return new Date(value);
    },
    parseLiteral(ast) {
        return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
    }
});

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList
    },
    Mutation: {
        setAboutMessage,
        issueAdd
    },
    GraphQLDate
};

function issueAdd(_, { issue }) {

    issue.created = new Date();
    issue.id = issuesDB.length + 1;
    if (issue.status == undefined) issue.status = 'New';
    issuesDB.push(issue);
    return issue;

}

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

function issueList() {
    return issuesDB;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function() {
    console.log('App started on 3000');
});