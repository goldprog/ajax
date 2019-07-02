# ajax
我封装的一个ajax插件，本插件支持jsonp调用

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
