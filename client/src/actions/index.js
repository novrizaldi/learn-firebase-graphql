import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const API_URL = 'http://localhost:3001/graphql/'

const client = new ApolloClient({
    uri: API_URL
});

//start load user
export const loadUserSuccess = (users) => ({
    type: 'LOAD_USER_SUCCESS',
    users
})

export const loadUserFailure = () => ({
    type: 'LOAD_USER_FAILURE'
})

export const loadUser = () => {
    const usersQuery = gql`
    query {
      users{
        Id
        Name
        Phone
      }
    }`;
    return dispatch => {
      return client.query({
        query: usersQuery,
      })
      .then(function (response) {
        console.log('ini response di actions', response);
        dispatch(loadUserSuccess(response.data.users))
      })
      .catch(function (error) {
        console.error(error);
        dispatch(loadUserFailure())
      });
    }
  }

// start post user data

export const postUserSuccess = (users) => ({
    type: 'POST_USER_SUCCESS',
    users
  })
  
  export const postUserFailure = (Id) => ({
    type: 'POST_USER_FAILURE', Id
  })
  
  const postUserRedux = (Id, Name, Phone) => ({
    type: 'POST_USER', Id, Name, Phone
  })
  
  
  export const postUser = (Id, Name, Phone) => {
    const addQuery = gql`
    mutation addUser($Id: ID!, $Name: String!, $Phone: String!) {
      addUser(Id: $Id, Name: $Name, Phone: $Phone) {
        Id
        Name
        Phone
      }
    }`;
    return dispatch => {
      dispatch(postUserRedux(Id, Name, Phone))
      return client.mutate({
        mutation: addQuery,
        variables: {
          Id,
          Name,
          Phone
        }
      })
      .then(function (response) {
        dispatch(postUserSuccess(response.data))
      })
      .catch(function (error) {
        console.error(error);
        dispatch(postUserFailure(Id))
      });
    }
  }
  
  // start delete user data
  
  const deleteUserRedux = (Id) => ({
    type: 'DELETE_USER', Id
  })
  
  export const deleteUserSuccess = (users) => ({
    type: 'DELETE_USER_SUCCESS',
    users
  })
  
  export const deleteUserFailure = () => ({
    type: 'DELETE_USER_FAILURE'
  })
  
  
  export const deleteUser = (Id) => {
    const deleteQuery = gql`
    mutation removeUser($Id: ID!) {
      removeUser(Id: $Id) {
        Id
      }
    }`;
    return dispatch => {
      dispatch(deleteUserRedux(Id))
      return client.mutate({
        mutation: deleteQuery,
        variables: {
          Id
        }
      })
      .then(function (response) {
        dispatch(deleteUserSuccess(response))
      })
      .catch(function (error) {
        console.error(error);
        dispatch(deleteUserFailure())
      });
    }
  }
  
  // end delete user data
  
  export const resendUser = (Id, Name, Phone) => {
    const addQuery = gql`
    mutation updateUser($Id: ID!, $Name: String!, $Phone: String!) {
      addUser(Id: $Id, Name: $Name, Phone: $Phone) {
        Id
        Name
        Phone
      }
    }`;
    return dispatch => {
      return client.mutate({
        mutation: addQuery,
        variables: {
          Id,
          Name,
          Phone
        }
      })
      .then(function (response) {
        dispatch(postUserSuccess(response))
      })
      .catch(function (error) {
        console.error(error);
        dispatch(postUserFailure(Id))
      });
    }
  }