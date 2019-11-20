package ctl

import (
	"net/http"

	"github.com/business/model"

	"github.com/gin-gonic/gin"
)

// Test xxx
func Test(c *gin.Context) {
	c.String(http.StatusOK, "cvOK!!")
	model.Dbconn()
}
