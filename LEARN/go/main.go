package main

import (
	"github.com/business/database"
	"github.com/business/router"
)

func main() {
	db, err := database.New()
	if err != nil {
		panic(err)
	}
	defer db.Close()
	r := router.Init(db)
	r.Run(":2499")
}
