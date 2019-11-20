package cat

import (
	"fmt"
)

// 面向对象编程思想-抽象
type Account struct {
	AccountName string
	Pwd         string
	Balance     float64
}

// 存款
func (ac *Account) Deposit(money float64, pwd string) {
	// 查款密码是否正确
	if pwd != ac.Pwd {
		fmt.Println("您输入的密码不正确")
		return
	}
	// 查看存款金额是否正确
	if money <= 0 {
		fmt.Println("你输入的金额不正确")
		return
	}
	ac.Balance += money
	fmt.Println("存款成功~~")
	ac.Query(pwd)
}

// 取款
func (ac *Account) Withdraw(money float64, pwd string) {
	if pwd != ac.Pwd {
		fmt.Println("你输入的密码不正确")
		return
	}
	if money <= 0 || money > ac.Balance {
		fmt.Println("您输入的金额不正确")
		return
	}
	ac.Balance -= money
	fmt.Println("取款成功")
	ac.Query(pwd)
}

// 查询

func (ac *Account) Query(pwd string) {
	if pwd != ac.Pwd {
		fmt.Println("你输入的密码不正确")
		return
	}
	fmt.Println("你的账号为", ac.AccountName)
	fmt.Println("你的账号余额为", ac.Balance)
}

// test

func Test() {
	ac := Account{
		AccountName: "gs111111",
		Pwd:         "yangqi7'",
		Balance:     100.0,
	}
	ac.Deposit(100, "yangqi7'")
	ac.Withdraw(110, "yangqi7'")
}

// 封装属性
// encapsulation
