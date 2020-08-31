const services = require('../../services');
const UserType = require('../types/user');
const { graphql, GraphQLNonNull, GraphQLID } = require('graphql');

exports.remove = {
    type : UserType.userType,
    args : {
        Id : {
            type : new GraphQLNonNull(GraphQLID)
        }
    }, 
    resolve( root, params) {
        return services.deleteUser(params);
    }
}