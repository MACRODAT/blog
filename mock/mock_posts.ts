//  @ts-nocheck

let d = Date();

export const mockPosts = [
    {
        node : {
            createdAt : d,
            slug : 'war',
            title : 'React introduction',
            excerpt : 'Discover React tools and learn all about web dev',
            authors : [
                {
                    photo : { url : 'me.jpg' },
                    bio : 'An independent amateur writer',
                    name : 'Jonas'
                }
            ],
            featureImage : {
                url : 'sider.jpg'
            },
            featuredPost : true,
            categories : {
                name : 'WEBDEV',
                url : 'webdev'
            }
        }
    },
    {
        node : {
            createdAt : d,
            slug : 'nex',
            title : 'Post n2',
            excerpt : 'This is just a plain usual post.',
            authors : [
                {
                    photo : { url : 'me.jpg' },
                    bio : 'An independent amateur writer',
                    name : 'Jonas'
                }
            ],
            featureImage : {
                url : 'house.jpg'
            },
            featuredPost : true,
            categories : {
                name : 'WEBDEV',
                url : 'webdev'
            }
        }
    }
]
// node {
//     createdAt
//     slug
//     title
//     excerpt
//     authors {
//         photo {
//             url
//         }
//         bio
//         name
//     }
//     featureImage {
//         url
//     }
//     featuredPost
//     categories {
//         name
//         url
//     }
// }