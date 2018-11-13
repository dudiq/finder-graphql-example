import {gql} from 'apollo-boost';
import queryType from '../utils/queryType';

const content = `
            repositoryCount
            edges {
              cursor
              node {
                ... on User {
                  id
                  name
                  createdAt
                  avatarUrl
                  bio
                  company
                  followers {
                    totalCount
                  }
                  location
                  watching {
                    totalCount
                  }
                }
              }
            }
`;


const pagingQuery = gql`
        query SearchUserPaging($str: String!, $perPage: Int!, $startFromCursor: String!) { 
          search(query: $str, type: USER, first: $perPage, after: $startFromCursor){
            ${content}
          }
        } 
`;

const initQuery = gql`
        query SearchUser($str: String!, $perPage: Int!) { 
          search(query: $str, type: USER, first: $perPage){
            ${content}
          }
        } 
`;

export default {
    [queryType.initialQuery]: initQuery,
    [queryType.pagingQuery]: pagingQuery,
};
