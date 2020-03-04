<h1 align="center">Welcome to chat-app 👋</h1>
<p>
  <img src="https://img.shields.io/badge/npm-%3E%3D5.5.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D9.3.0-blue.svg" />
  <a href="https://github.com/mayuba/chat-app#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/mayuba/chat-app/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/mayuba/chat-app/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/mayuba/chat-app" />
  </a>
</p>

> This project is a small chat app, with GraphQL, apollo-server-express and Node.js

### 🏠 [Homepage](https://github.com/mayuba/chat-app#readme)

### ✨ [Demo](localhost:4000/graphql)

## Prerequisites

- npm >=5.5.0
- node >=9.3.0

## Install

```sh
npm install
```

## Usage

```sh
npm start
```

- Browse to [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Directory layout

```
.
├── /src/                       # The source code of the application
│   ├── /fixtures/              # Contains sample data
│   ├── /schema                 # Build controllers (schema, Mutation and Query)
│   ├── /services               # Contain all services
│   └── /util                   # Contain Util
├── .eslintrc.js                # eslint config (http://eslint.org/)
├── .gitignore                  # git ignore files config
├── index.js                    # Boot server side
├── Assembly.js                 # Builds all the application dependencies
├── package.json                # The list of libraries and utilities
└── README.md                   # Describes the project
```

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

### Enum

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

````graphql
mutation {
  createForum(input: { userID: "3", name: "forum test", type: PRIVATE }) {
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
````

#### If the request is accepted, the user automatically joins the forum.

```graphql
mutation {
  changeStatus(adminID: "1", userID: "3", forumID: "1", newStatus: approved)
}
```

## Author

👤 **Josaphat Mayuba Ndele**

- Github: [@mayuba](https://github.com/mayuba)
- LinkedIn: [@josaphat mayuba ndele](https://www.linkedin.com/in/josaphat-mayuba-ndele-18474296/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mayuba/chat-app/issues). You can also take a look at the [contributing guide](https://github.com/mayuba/chat-app/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Josaphat Mayuba Ndele](https://github.com/mayuba).<br />
This project is [ISC](https://github.com/mayuba/chat-app/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
