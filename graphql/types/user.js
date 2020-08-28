const { graphql } = require('graphql');
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require ('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInteger = require('graphql').GraphQLInteger;

//usertype
exports.userType = new GraphQLObjectType ({
    name : 'user',
    fields : function(){
        return {
            Id : {
                type : new GraphQLNonNull(GraphQLID)
            },
            Name : {
                type : GraphQLString
            }, 
            Phone : {
                type :GraphQLString
            }
        }
    }
});
