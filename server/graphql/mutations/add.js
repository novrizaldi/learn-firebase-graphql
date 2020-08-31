var GraphQLNonNull = require ('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLID = require('graphql').GraphQLID;
var Usertype = require('../types/user');
var services = require('../../services');

exports.add = {
    type : Usertype.userType,
    args : {
        Id : {
            type : new GraphQLNonNull(GraphQLID),
        },
        Name : {
            type : new GraphQLNonNull(GraphQLString),
        },
        Phone : {
            type : new GraphQLNonNull(GraphQLString)
        }
    }, 
    resolve(root, params){
        return services.createUser(params)
    }
}