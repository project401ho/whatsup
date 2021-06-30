/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      count
      title
      type
      createdAt
      content
      video
      uploader
      likes
      hates
      liked_users
      hated_users
      comments {
        items {
          id
          postID
          post {
            id
            count
            title
            type
            createdAt
            content
            video
            uploader
            likes
            hates
            liked_users
            hated_users
            updatedAt
          }
          nickname
          content
          likes
          hates
          reported
          liked_users
          hated_users
          createdAt
          updatedAt
        }
        nextToken
      }
      resources {
        items {
          id
          postID
          post {
            id
            count
            title
            type
            createdAt
            content
            video
            uploader
            likes
            hates
            liked_users
            hated_users
            updatedAt
          }
          order
          file
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      count
      title
      type
      createdAt
      content
      video
      uploader
      likes
      hates
      liked_users
      hated_users
      comments {
        items {
          id
          postID
          post {
            id
            count
            title
            type
            createdAt
            content
            video
            uploader
            likes
            hates
            liked_users
            hated_users
            updatedAt
          }
          nickname
          content
          likes
          hates
          reported
          liked_users
          hated_users
          createdAt
          updatedAt
        }
        nextToken
      }
      resources {
        items {
          id
          postID
          post {
            id
            count
            title
            type
            createdAt
            content
            video
            uploader
            likes
            hates
            liked_users
            hated_users
            updatedAt
          }
          order
          file
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      count
      title
      type
      createdAt
      content
      video
      uploader
      likes
      hates
      liked_users
      hated_users
      comments {
        items {
          id
          postID
          post {
            id
            count
            title
            type
            createdAt
            content
            video
            uploader
            likes
            hates
            liked_users
            hated_users
            updatedAt
          }
          nickname
          content
          likes
          hates
          reported
          liked_users
          hated_users
          createdAt
          updatedAt
        }
        nextToken
      }
      resources {
        items {
          id
          postID
          post {
            id
            count
            title
            type
            createdAt
            content
            video
            uploader
            likes
            hates
            liked_users
            hated_users
            updatedAt
          }
          order
          file
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      postID
      post {
        id
        count
        title
        type
        createdAt
        content
        video
        uploader
        likes
        hates
        liked_users
        hated_users
        comments {
          items {
            id
            postID
            nickname
            content
            likes
            hates
            reported
            liked_users
            hated_users
            createdAt
            updatedAt
          }
          nextToken
        }
        resources {
          items {
            id
            postID
            order
            file
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nickname
      content
      likes
      hates
      reported
      liked_users
      hated_users
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      postID
      post {
        id
        count
        title
        type
        createdAt
        content
        video
        uploader
        likes
        hates
        liked_users
        hated_users
        comments {
          items {
            id
            postID
            nickname
            content
            likes
            hates
            reported
            liked_users
            hated_users
            createdAt
            updatedAt
          }
          nextToken
        }
        resources {
          items {
            id
            postID
            order
            file
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nickname
      content
      likes
      hates
      reported
      liked_users
      hated_users
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      postID
      post {
        id
        count
        title
        type
        createdAt
        content
        video
        uploader
        likes
        hates
        liked_users
        hated_users
        comments {
          items {
            id
            postID
            nickname
            content
            likes
            hates
            reported
            liked_users
            hated_users
            createdAt
            updatedAt
          }
          nextToken
        }
        resources {
          items {
            id
            postID
            order
            file
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nickname
      content
      likes
      hates
      reported
      liked_users
      hated_users
      createdAt
      updatedAt
    }
  }
`;
export const onCreateResource = /* GraphQL */ `
  subscription OnCreateResource {
    onCreateResource {
      id
      postID
      post {
        id
        count
        title
        type
        createdAt
        content
        video
        uploader
        likes
        hates
        liked_users
        hated_users
        comments {
          items {
            id
            postID
            nickname
            content
            likes
            hates
            reported
            liked_users
            hated_users
            createdAt
            updatedAt
          }
          nextToken
        }
        resources {
          items {
            id
            postID
            order
            file
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      order
      file
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateResource = /* GraphQL */ `
  subscription OnUpdateResource {
    onUpdateResource {
      id
      postID
      post {
        id
        count
        title
        type
        createdAt
        content
        video
        uploader
        likes
        hates
        liked_users
        hated_users
        comments {
          items {
            id
            postID
            nickname
            content
            likes
            hates
            reported
            liked_users
            hated_users
            createdAt
            updatedAt
          }
          nextToken
        }
        resources {
          items {
            id
            postID
            order
            file
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      order
      file
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteResource = /* GraphQL */ `
  subscription OnDeleteResource {
    onDeleteResource {
      id
      postID
      post {
        id
        count
        title
        type
        createdAt
        content
        video
        uploader
        likes
        hates
        liked_users
        hated_users
        comments {
          items {
            id
            postID
            nickname
            content
            likes
            hates
            reported
            liked_users
            hated_users
            createdAt
            updatedAt
          }
          nextToken
        }
        resources {
          items {
            id
            postID
            order
            file
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      order
      file
      createdAt
      updatedAt
    }
  }
`;
