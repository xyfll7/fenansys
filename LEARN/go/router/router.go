package router

import (
	"github.com/business/database"
	"github.com/business/router/ctl"

	"github.com/gin-gonic/gin"
)

func Init(db *database.Client) *gin.Engine {
	r := gin.Default()
	sv := r.Group("/api")
	{
		sv.GET("/test", ctl.Test)
	}
	return r
}
