package cat

//工厂模式

type students struct {
	Name  string
	score float64
}

func NewStudents(n string, s float64) *students {
	return &students{
		Name:  n,
		score: s,
	}
}

func (s *students) GetScore() float64 {
	return s.score
}
