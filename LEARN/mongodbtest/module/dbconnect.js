const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017,localhost:27018,localhost:27019/mytest?replicaSet=rep'

MongoClient.connect(url, function(err, client) {
  assert.strictEqual(null, err)
  const db = client.db('mytest')

  db.collection('inventory')
    .insertOne({
      item: 'canvas',
      qty: 100,
      tags: ['cotton'],
      size: { h: 28, w: 35.5, uom: 'cm' }
    })
    .then(function(result) {
      console.log(result.ops)
    })
  client.close()
})
