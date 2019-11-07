import Vue from 'vue'
export const store = Vue.observable({ avatarUrl: '' })

function setAvatar(avatarUrl) {
  store.avatarUrl = avatarUrl
}
export const mutations = { setAvatar }
