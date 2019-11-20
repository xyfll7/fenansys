package cat

import (
	"encoding/json"
	"fmt"
)

type cat struct {
	Name  string
	Age   int
	Color string
	Score [5]float64
	Hobby string
	Slice []int
	MyMap map[string]string
}

func New(name string, age int) *cat {
	return &cat{
		Name: name,
		Age:  age,
	}
}

type Person struct {
	Name string
	Age  int
}

// 创建结构体变量
func CreateStructureVariable() {
	// 写法1
	var p2 Person
	p2.Name = "小红"
	p2.Age = 88
	fmt.Println(p2)
	// 写法2
	p1 := Person{"小丽", 16}
	fmt.Println(p1)
	// 写法11
	p11 := Person{
		Name: "11名",
		Age:  18,
	}
	fmt.Println(p11)
	// 写法3
	var p3 Person = Person{
		Name: "小明",
		Age:  13,
	}
	fmt.Println(p3)
	// 写法4
	p4 := Person{
		Name: "阿黄",
		Age:  18,
	}
	fmt.Println(p4)
	// 写法5
	var p5 *Person = new(Person) // 创建一个指针
	(*p5).Name = "指针"
	(*p5).Age = 77
	fmt.Println(*p5)
	var p6 *Person = new(Person)
	(*p6).Name = "指针针"
	(*p6).Age = 777
	fmt.Println(*p6)
	// 写法8
	p5.Name = "指针真" // 实际上是个指针
	fmt.Println(p5)
	// 写法9
	var p7 *Person = &Person{
		Name: "写法9",
	}
	p7.Age = 666
	fmt.Println(p7)
	// 写法10
	p8 := &Person{
		Name: "写法10",
	}
	p8.Age = 111
	fmt.Println(p8)
}

type Point struct {
	x int
	y int
}

type Rect struct {
	leftUp    Point
	rightDown Point
}

// 嵌套结构体
func NestedStruct() {
	r1 := Rect{Point{1, 2}, Point{3, 4}}
	fmt.Println(r1)
}

// 结构体类型转换
type A struct {
	Num int
}

type B struct {
	Num int
}

func StructureTypeConversion() {
	a := A{1}
	b := B{1}
	a = A(b)
	fmt.Print(a, b)
}

type Student struct {
	Name string
	Age  int
}

type Stu Student

func StructureTypeConversion0() {
	var stu1 Student
	var stu2 Stu
	stu2 = Stu(stu1)
	fmt.Println(stu1, stu2)
}

type integger int

func StructureTypeConversion1() {
	var i integger = 10
	var j int = 20
	j = int(i)
	fmt.Println(j, i)
}

// 结构体序列化
type Monster struct {
	Name  string `json:"name"`
	Age   int    `json:"age"`
	Skill string `json:"skill"`
}

func StructureSerialization() {
	monster := Monster{
		Name:  "牛魔王",
		Age:   100,
		Skill: "牛魔拳",
	}
	jsonStr, err := json.Marshal(monster)
	if err != nil {
		fmt.Println("json处理错误", err)
	}
	fmt.Println("jsonStr", string(jsonStr))
}
