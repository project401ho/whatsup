/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          comments {
            nextToken
          }
          resources {
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
      nextToken
    }
  }
`;
export const getResource = /* GraphQL */ `
  query GetResource($id: ID!) {
    getResource(id: $id) {
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
export const listResources = /* GraphQL */ `
  query ListResources(
    $filter: ModelResourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResources(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          comments {
            nextToken
          }
          resources {
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
      nextToken
    }
  }
`;
export const postsByDate = /* GraphQL */ `
  query PostsByDate(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
