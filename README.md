# ajax
自己封装的一个ajax插件，本插件支持jsonp调用

# API

``` js
  ajax({
    url: 'http://localhost:3050/api', // 请求地址
    type: 'post', // 请求方式，支持post或者get
    jsonp: 'jsonpcallback', // 支持jsonp请求, 值为自定义的函数名
    data: { // 请求体
      username: 'goldprog',
      password: '123456'
    },
    success: function(res) { // 成功的回调
      content.innerHTML = JSON.stringify(res.data)
    },
    fail: function(res) { // 失败的回调
    }
  })
```

# 如果您要运行这个实例 

请先运行服务端代码

```
npm install
node server.js
```
