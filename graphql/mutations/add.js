var GraphQLNonNull = require ('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLID = require('graphql').GraphQLID;
var Usertype = require('../types/user');
var services = require('../../services');

exports.add = {
    type : Usertype.userType,
    args : {
        id : {
            type : new GraphQLNonNull(GraphQLID),
        },
        name : {
            type : new GraphQLNonNull(GraphQLString),
        },
        phone : {
            type : new GraphQLNonNull(GraphQLString)
        }
    }, 
    resolve(root, params){
        return services.createUser(params)
    }
}