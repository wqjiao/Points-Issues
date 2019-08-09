# Node 开发 cli 工具

* mkdir node-cli && cd node-cli

* npm init -- package.json
```json
{
    "name": "node-cli",
    "version": "1.0.0",
    "description": "测试 cli",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "wqjiao",
    "license": "ISC",
    "bin": {
        "node-cli": "./index.js"
    },
    "dependencies": {}
}
```

* touch index.js
```js
#! node
console.log("hello node cli");
```

* npm install -g

* node-cli
打印 `hello node cli`

* 简单的cli

```js
#! node

let fs = require('fs');
let path = require('path');

function copyTemplate(from, to) {
    // 获取 templates 文件路径
    from = path.join(__dirname, 'templates', from);
    // 写入 to 路径
    write(to, fs.readFileSync(from, 'utf-8'))
}

function write(path, str, mode) {
    fs.writeFileSync(path, str)
}

function mkdir(path, fn) {
    fs.mkdir(path, function (err) {
        fn && fn()
    })
}

let PATH = ".";

copyTemplate("index.html", PATH + '/index.html');
copyTemplate("package.json", PATH + '/package.json');
```
