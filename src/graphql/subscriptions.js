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
      image
      video
      uploader
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
            image
            video
            uploader
            updatedAt
          }
          nickname
          content
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
      image
      video
      uploader
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
            image
            video
            uploader
            updatedAt
          }
          nickname
          content
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
      image
      video
      uploader
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
            image
            video
            uploader
            updatedAt
          }
          nickname
          content
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
        image
        video
        uploader
        comments {
          items {
            id
            postID
            nickname
            content
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nickname
      content
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
        image
        video
        uploader
        comments {
          items {
            id
            postID
            nickname
            content
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nickname
      content
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
        image
        video
        uploader
        comments {
          items {
            id
            postID
            nickname
            content
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      nickname
      content
      createdAt
      updatedAt
    }
  }
`;
