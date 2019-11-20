package main

import (
	"fmt"

	"github.com/goo/cat"
)

func main() {
	// var cat cat.Cat
	// {
	// 	cat.Name = "小花"
	// 	cat.Age = 18
	// 	cat.Color = "red"
	// 	cat.Score[1] = 55.6
	// 	cat.Hobby = "play"
	// 	cat.Slice = make([]int, 10)
	// 	cat.Slice[0] = 100
	// 	cat.MyMap = make(map[string]string, 10)
	// 	cat.MyMap["小红"] = "小梅的女儿"
	// }

	kitty := cat.New("小花", 18)
	fmt.Println(kitty)
	lily := cat.New("丽丽", 19)
	fmt.Println(lily)
	cat.CreateStructureVariable()
	cat.NestedStruct()
	cat.StructureTypeConversion()
	cat.StructureTypeConversion0()
	cat.StructureTypeConversion1()
	cat.StructureSerialization()
	dog := cat.Dog{Name: "阿黄"}
	dog.Speak()
	fmt.Println(&dog)

	var stu0 *cat.Student = &cat.Student{
		Name: "李雨桐",
		Age:  66,
	}
	stu := &cat.Student{
		Name: "黄潇",
		Age:  55,
	}
	fmt.Println(stu0)
	fmt.Println(*stu)
	var student = cat.NewStudents("阿黄", 99) // 工厂模式
	fmt.Println(student.GetScore())
}

// 工厂模式
