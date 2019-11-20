package main

import "github.com/business/router"

func main() {
	r := router.Init()
	r.Run(":2499")
}
