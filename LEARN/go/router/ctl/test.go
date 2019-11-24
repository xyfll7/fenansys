package ctl

import (
	"context"
	"fmt"
	"net/http"

	"github.com/business/database"
	"github.com/gin-gonic/gin"
	"github.com/pkg/errors"
	"go.mongodb.org/mongo-driver/bson"
)

type TestDatabase interface {
}

type TestAPI struct {
	DB TestDatabase
}

// Test xxx
func (a *TestAPI) Test(c *gin.Context) {
	c.String(http.StatusOK, "cvOK!!")

	collection := a.DB.Client.Database("baz").Collection("qux")
	res, err := collection.InsertOne(context.Background(), bson.M{"hello": "world"})
	if err != nil {
		errors.Wrap(err, "Error Creating MongoDB Client")
		// return err
	}

	id := res.InsertedID
	fmt.Println(id)
	fmt.Println(res)
}
