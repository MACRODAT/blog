//  @ts-nocheck

import { request , gql, GraphQLClient } from 'graphql-request';
import { mockPosts } from '../mock/mock_posts';


const graphqlAPI : string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;

export async function getPosts(){
    const graphQLClient = new GraphQLClient('https://api-eu-west-2.graphcms.com/v2/cl549m93m34gp01uj2ywh6d6r/master');
    const query = gql`
            query MyQuery {
                postsConnection {
                edges {
                    node {
                    createdAt
                    slug
                    title
                    excerpt
                    authors {
                        photo {
                        url
                        }
                        bio
                    }
                    featureImage {
                        url
                    }
                    featuredPost
                    categories {
                        name
                        url
                    }
                    }
                }
                }
            }
    `;

    const  result =  graphQLClient.request(query);
    return result.then((_res) => {
        return _res.postsConnection.edges;
    }, (_err) => console.log("error -> " + _err));
}

export const getRecentPosts = async () => {
    const query = gql`
        query getPostDetails(){
            posts(
                orderBy: createdAt_ASC
                last : 3
            ){
                title
                featureImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const graphQLClient = new GraphQLClient('https://api-eu-west-2.graphcms.com/v2/cl549m93m34gp01uj2ywh6d6r/master');
    const  result =  graphQLClient.request(query);
    return result;
}

export const getSimilarPosts = async (category : any, slug : any) => {
    const query = gql`
        query getPostDetails($slug: String!, $categories: [String!]){
            posts(
                where: { slug_not; $slug, AND: {categories_some: {slug_in: $categories}}}
                last: 3
            ) {
                title
                featureImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const graphQLClient = new GraphQLClient('https://api-eu-west-2.graphcms.com/v2/cl549m93m34gp01uj2ywh6d6r/master');
    const  result =  graphQLClient.request(query);
    return result;
}


export async function getPostDetails(slug : String){
    const graphQLClient = new GraphQLClient('https://api-eu-west-2.graphcms.com/v2/cl549m93m34gp01uj2ywh6d6r/master');
    const query = gql`
            query GetPostDetails($slug : String!) {
                posts(where: { slug : $slug}) {
                    createdAt
                    slug
                    title
                    excerpt
                    authors {
                        photo {
                            url
                        }
                        bio
                        name
                    }
                    featureImage {
                        url
                    }
                    featuredPost
                    categories {
                        name
                        url
                    }  
                    content {
                        raw
                    }                  
                }
            }
    `;


    const  result =  graphQLClient.request(query, { slug : slug });
    return result.then((_res) => {
        return _res.posts[0];
    }, (_err) => console.log("error -> " + _err));
}

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                url
            }
        }
    `

    const graphQLClient = new GraphQLClient('https://api-eu-west-2.graphcms.com/v2/cl549m93m34gp01uj2ywh6d6r/master');
    const  result =  graphQLClient.request(query);
    return result;
}