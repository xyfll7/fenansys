import Vue from 'vue'
export const store = Vue.observable({ avatarUrl: '' })

function setAvatar(avatarUrl) {
  store.avatarUrl = avatarUrl
}
export const mutations = { setAvatar }

export const team = {
  _id: '',
  name: '',
  numberOfCasesHandled: [null, null, null, null, null, null, null, null, null, null, null, null, null]
}
// 团队办案数量分12个月，设置了13个月，第0个专门存放初始办案数量
// 初始办案数量是可以修改的
// 正常月份的办案数量不可更改（正常月份的办案数量是由案件信息列表自动统计出来的，所以不可更改）
// 此处是检查正常月份是否已经有办案数量，如果正常月份已经有办案数量则这个团队是不可以被修改的（但是仍然可以编辑初始办案数量）
// 初始办案数量任何时候都可以编辑
