var express = require('express')
var app = express()
//导入querystring模块（解析post请求数据）
var querystring = require('querystring')

app.post('/api', function(req, res) {
  var data = ''
  req.on('data', function(chunk) {
    data += chunk
  })
  req.on('end', function() {
    data = querystring.parse(data)
    console.log(data)
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    res.send({ code: 100, data: {...data}, message: 'success' })
  })
})

app.get('/getdata', function(req, res) {
  var query = req.query
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.send({ code: 100, data: {...query}, message: 'success' })
})

app.get('/jsonp', function(req, res) {
  var callback = req.query.callback
  var data = {
    code: 100,
    data: {
      say_info: 'hello world'
    },
    message: 'success'
  }
  var str = callback + '('+JSON.stringify(data)+')'
  // res.end(str)
})

app.listen(3050, function() {
  console.log('app is running in 3050')
})
