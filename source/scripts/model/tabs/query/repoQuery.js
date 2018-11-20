import {gql} from 'apollo-boost';
import queryType from '../utils/queryType';

const content = `
            repositoryCount
            edges {
              cursor      
              node {
                ... on Repository {
                  id
                  name
                  description
                  createdAt      
                  forkCount
                  stargazers {
                    totalCount
                  }
                }
              }
            }
`;

const pagingQuery = gql`
        query SearchRepoPaging($str: String!, $perPage: Int!, $startFromCursor: String!) { 
          search(query: $str, type: REPOSITORY, first: $perPage, after: $startFromCursor){
            ${content}
          }
        }
 
`;
const startQuery = gql`
        query SearchRepo($str: String!, $perPage: Int!) { 
          search(query: $str, type: REPOSITORY, first: $perPage){
            ${content}
          }
        }
`;


export default {
    [queryType.initialQuery]: startQuery,
    [queryType.pagingQuery]: pagingQuery,
};
