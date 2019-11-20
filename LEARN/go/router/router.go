package router

import (
	"github.com/business/router/ctl"

	"github.com/gin-gonic/gin"
)

func Init() *gin.Engine {
	r := gin.Default()
	sv := r.Group("/api")
	{
		sv.GET("/test", ctl.Test)
	}
	return r
}
