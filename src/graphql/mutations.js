/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      count
      title
      type
      createdAt
      content
      video
      uploader
      source
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
            source
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
          reported_users
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
            source
            likes
            hates
            liked_users
            hated_users
            updatedAt
          }
          order
          file
          uploader_comment
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      count
      title
      type
      createdAt
      content
      video
      uploader
      source
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
            source
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
          reported_users
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
            source
            likes
            hates
            liked_users
            hated_users
            updatedAt
          }
          order
          file
          uploader_comment
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      count
      title
      type
      createdAt
      content
      video
      uploader
      source
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
            source
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
          reported_users
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
            source
            likes
            hates
            liked_users
            hated_users
            updatedAt
          }
          order
          file
          uploader_comment
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
        source
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
            reported_users
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
            uploader_comment
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
      reported_users
      liked_users
      hated_users
      createdAt
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
        source
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
            reported_users
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
            uploader_comment
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
      reported_users
      liked_users
      hated_users
      createdAt
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
        source
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
            reported_users
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
            uploader_comment
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
      reported_users
      liked_users
      hated_users
      createdAt
      updatedAt
    }
  }
`;
export const createResource = /* GraphQL */ `
  mutation CreateResource(
    $input: CreateResourceInput!
    $condition: ModelResourceConditionInput
  ) {
    createResource(input: $input, condition: $condition) {
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
        source
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
            reported_users
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
            uploader_comment
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      order
      file
      uploader_comment
      createdAt
      updatedAt
    }
  }
`;
export const updateResource = /* GraphQL */ `
  mutation UpdateResource(
    $input: UpdateResourceInput!
    $condition: ModelResourceConditionInput
  ) {
    updateResource(input: $input, condition: $condition) {
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
        source
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
            reported_users
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
            uploader_comment
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      order
      file
      uploader_comment
      createdAt
      updatedAt
    }
  }
`;
export const deleteResource = /* GraphQL */ `
  mutation DeleteResource(
    $input: DeleteResourceInput!
    $condition: ModelResourceConditionInput
  ) {
    deleteResource(input: $input, condition: $condition) {
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
        source
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
            reported_users
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
            uploader_comment
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      order
      file
      uploader_comment
      createdAt
      updatedAt
    }
  }
`;
