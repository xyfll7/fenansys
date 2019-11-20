package model

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type ClientConfig struct {
	Hosts               []string
	UserName            string
	Password            string
	TimeoutMilliseconds uint32
}

type Client struct {
	Client    *mongo.Client
	connected bool
	Timeout   uint32
}

func NewClient(config ClientConfig) (*Client, err) {
	connStr := fmt.Sprintf(
		"mongodb://%s:%s@%s",
		config.UserName,
		config.Password,
		config.Hosts[0],
	)
	client, err := mongo.NewClient(connStr)
	if err != nil {
		return nil, err
	}
	if confi
}

// Dbconn xx
func Dbconn() (*Client, error) {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017,localhost:27018,localhost:27019"))
	if err != nil {
		return nil, err
	}
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		return nil, err
	}

	collection := client.Database("xinjiangfy").Collection("quxe")
	res, err := collection.InsertOne(context.Background(), bson.M{"hello": "world"})
	if err != nil {
		return nil, err
	}
	id := res.InsertedID
	fmt.Println(id)
	return client, err
}
