# Release notes

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 2.0.0

- Improve forum has a notion of public and private forums.
- When a forum is private, no-one can see it in the list of available forums.
- A user can ask to join a private forum only if he knows the forum ID.
- When an ask request is sent, the admin of this forum can accept or refuse the request.
- If the request is accepted, the user automatically joins the forum.
- create file CHANGES.md

### Impove

#### User can create public and private forums.

```graphql
mutation {
  createForum(input: { userID: "3", name: "forum test", type: PRIVATE }) {
    name
  }
}
```

### Added

#### If the request is accepted, the user automatically joins the forum.

```graphql
mutation {
  changeStatus(adminID: "1", userID: "3", forumID: "1", newStatus: approved)
}
```

#### Enum

````graphql
enum TypeForum {
  PRIVATE
  PUBLIC
}

```graphql
enum Status {
  approved
  refused
  waiting
}
````

### No change

## GraphQl Type

### Forum

```graphql
type Forum {
  id: ID!
  name: String
  createDate: String
  members: [User]
}
```

### Message

```graphql
type Message {
  id: ID!
  message: String!
  date: String
  from: User
}
```

### User

```graphql
type User {
  id: ID!
  username: String!
  picture: String!
}
```

## GraphQl Schema

### A user can see the list of forums he has joined

```graphql
query {
  getMyForumList(userID: 2) {
    name
  }
}
```

### A user can see the list of forums he has joined and see members forum

```graphql
query {
  getMyForumList(userID: 2) {
    name
    members {
      username
      picture
    }
  }
}
```

### see the list of previous messages, ordered by most recent. To be displayed in our client, a message should at least have a text, a sending time and name/picture of the sender yes

```graphql
{
  getMessages(userID: "2", forumID: "2") {
    id
    message
    from {
      username
      picture
    }
    date
  }
}
```

### see the name and picture of the members of the forum

```graphql
{
  forums {
    id
    name
    members {
      username
      picture
    }
  }
}
```

### A user can see the list of available forum and members by forums

```graphql
{
  forums {
    id
    name
    members {
      username
      picture
    }
  }
}
```

### can join any forum available

```graphql
mutation {
  joinForum(userID: "2", forumID: "1")
}
```

### post a message in the forum

```graphql
mutation {
  sendMessage(
    input: {
      message: "bonjour comment tu vas je mappelle numero 3"
      forumID: "1"
      userID: "3"
    }
  ) {
    date
    message
  }
}
```

## 1.0.0

- Generate project
- A user can see the list of forums he has joined.
- A user can create a new forum (and join it automatically)
- A user can see the list of available forum and can join any
- He can also join a forum if he knows the forum id
- see the list of previous messages, ordered by most recent. To be displayed in our client, a message should at least have a text, a sending time and name/picture of the sender
- see the name and picture of the members of the forum
- post a message in the forum

## GraphQl Type

### Forum

```graphql
type Forum {
  id: ID!
  name: String
  createDate: String
  members: [User]
}
```

### Message

```graphql
type Message {
  id: ID!
  message: String!
  date: String
  from: User
}
```

### User

```graphql
type User {
  id: ID!
  username: String!
  picture: String!
}
```

## GraphQl Schema

### A user can see the list of forums he has joined

```graphql
query {
  getMyForumList(userID: 2) {
    name
  }
}
```

### A user can see the list of forums he has joined and see members forum

```graphql
query {
  getMyForumList(userID: 2) {
    name
    members {
      username
      picture
    }
  }
}
```

### see the list of previous messages, ordered by most recent. To be displayed in our client, a message should at least have a text, a sending time and name/picture of the sender yes

```graphql
{
  getMessages(userID: "2", forumID: "2") {
    id
    message
    from {
      username
      picture
    }
    date
  }
}
```

### see the name and picture of the members of the forum

```graphql
{
  forums {
    id
    name
    members {
      username
      picture
    }
  }
}
```

### A user can see the list of available forum and members by forums

```graphql
{
  forums {
    id
    name
    members {
      username
      picture
    }
  }
}
```

### can join any forum available

```graphql
mutation {
  joinForum(userID: "2", forumID: "1")
}
```

### A user can create a new forum (and join it automatically)

```graphql
mutation {
  createForum(input: { userID: "1", name: "new forum 1" }) {
    id
    name
  }
}
```

### post a message in the forum

```graphql
mutation {
  sendMessage(
    input: {
      message: "bonjour comment tu vas je mappelle numero 3"
      forumID: "1"
      userID: "3"
    }
  ) {
    date
    message
  }
}
```
