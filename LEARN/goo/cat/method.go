package cat

import (
	"fmt"
)

type Dog struct {
	Name  string
	Age   int
	Hobby string
}

func (d *Dog) Speak() {
	d.Name = "小黄"
	d.Age = 699999999999
	d.Hobby = "玩a"
	fmt.Println(d.Name, "汪汪～🐶")
	fmt.Println("d")
	fmt.Println(d)
	fmt.Println("d")
}

func (d *Dog) String() string {
	return d.Name + string(d.Age) + d.Hobby + "!!!!!~~"
}

type Studenter struct {
	Name string
	Age  int
}
