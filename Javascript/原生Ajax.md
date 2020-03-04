# 原生Ajax请求 XMLHttpRequest

```js
let Ajax = {
    get: function (url, fn) {
        // XMLHttpRequest对象用于在后台与服务器交换数据   
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 从服务器获得数据 
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send();
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function (url, data, fn) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        // xhr.open("POST", 'http://192.168.1.128:5022/system/order/getOrderCreateBy', true);
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.setRequestHeader('Authorization', 'bb850ec168d55eedcb0b47ac4e7c9d6b')
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                fn.call(this, xhr.responseText);
            }
        };

        // application/json 格式：{key: value, key: value}
        xhr.send(JSON.stringify(data));
        // application/x-www-form-urlencoded 格式：key=value&key=value
        // xhr.send(Qs.stringify(data));
    }
}
```
