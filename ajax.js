(function(global, factory){
  global.ajax = factory(global)
})(this, function(global) {
  var ajax = function(params = {}) {
    params.jsonp ? jsonp(params) : json(params)

  }

  // ajax请求方法
  function json(params = {}) {
    params.type = (params.type || 'GET').toUpperCase()
    params.data = querilize(params.data)
    var xhr = null
    if(window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else {
      xhr = new ActiveXObjcet('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        var status = xhr.status
        if(status >= 200 && status < 300) {
          var response = ''
          var contentType = xhr.getResponseHeader('Content-type')
          if(contentType.indexOf('xml') !== -1 && xhr.responseXML) {
            response = xhr.responseXML // document对象
          } else if(contentType.indexOf('application/json') !== -1) {
            response = JSON.parse(xhr.responseText) // json对象
          } else {
            response = xhr.responseText // 字符串响应
          }
          params.success && params.success(response)
        } else {
          params.error && params.error(status)
        }
      }
    }

    if(params.type === 'GET') {
      // open接受三个参数 第一个参数是请求类型，第二个参数是请求路径， 第三个参数是异步或者同步， 一般都是异步
      xhr.open(params.type, params.url + '?' + params.data, true)
      xhr.send(null)
    } else {
      xhr.open(params.type, params.url , true)
      //设置请求头部发送时的文本格式 必须设置
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.send(params.data)
    }
  }

  // jsonp请求方法

  function jsonp(params = {}) {
    var bodyData = querilize(params.data)
    var callbackName = params.jsonp
    var url = params.url + '?' + bodyData + '&callback='+callbackName

    var script = document.createElement('script')
    var head = document.getElementsByTagName('head')[0]
    script.src = url
    script.type = 'text/javascript'
    head.appendChild(script)

    global[callbackName] = function(res) {
      params.success && params.success(res)
      script.timer = null
      clearTimeout(script.timer)
      head.removeChild(script)
      delete global[callbackName]
    }

    // script标签加载出错
    script.onerror = function() {
      params.fail && params.fail('请求失败')
      script && head.removeChild(script)
      delete global[callbackName]
    }

    // 超时处理
    if(params.time) {
      script.timer = setTimeout(() => {
        params.fail && params.fail('请求超时')
        script && head.removeChild(script)
        delete global[callbackName]
      }, params.time);
    }

  }


  // 将参数序列化 xhr.send()中的参数必须是一个序列化的参数，而不能传递json
  function querilize(obj) {
    var tempObj = JSON.parse(JSON.stringify(obj))
    var tempArr = []
    for(var key in tempObj) {
      tempArr.push(encodeURIComponent(key)+'='+encodeURIComponent(tempObj[key]))
    }
    tempArr.push('cache='+randomStr())
    return tempArr.join('&')
  }
  // 随机字符串
  function randomStr() {
    return Math.floor((Math.random() * 10000) + 500)
  }
  return ajax
})