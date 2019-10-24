# fenansys [分案系统](http://git.ssfwzxw.com)

## Project setup

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn serve
```

### Compiles and minifies for production

```bash
yarn build
```

### Lints and fixes files

```bash
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### mongodb rep

```js
config = {
  _id: 'rep',
  members: [
    {
      _id: 0,
      host: '127.0.0.1:27017'
    },
    {
      _id: 1,
      host: '127.0.0.1:27018'
    },
    {
      _id: 2,
      host: '127.0.0.1:27019'
    }
  ]
}

rs.initiate(config)
```

### alias git

```bash
alias gitt="git add . && git commit -m 'build' && git push"
alias gittgs="gitt && git push server master"
alias gittbgs="yarn build && gitt && gitts"
```
