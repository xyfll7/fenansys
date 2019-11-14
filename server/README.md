# [Secure your MongoDB Deployment](https://docs.mongodb.com/guides/server/auth/)

```js
db.createUser(
  {
    user: "xyf",
    pwd: "yangqi7'",
    roles: [ "root" ]
  }
)
```

```js
db.shutdownServer()
```

## mongodb rep

```js
config = {
  _id: 'rep',
  members: [
    {
      _id: 0,
      host: '127.0.0.1:27017'
    },
    {
      _id: 1,
      host: '127.0.0.1:27018'
    },
    {
      _id: 2,
      host: '127.0.0.1:27019'
    }
  ]
}

rs.initiate(config)
```