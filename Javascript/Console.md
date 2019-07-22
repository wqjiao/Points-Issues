# console 用法

## 1、console.log
    
用于输出普通信息

使用占位符 %c 自定义打印标题的样式，一眼看出自己打印的日志：
    
    console.log("%c 车300", 'color: red; background: #000');

## 2、console.info

用于输出提示性信息

## 3、console.error
    
用于输出错误信息

## 4、console.warn

用于输出警示信息

## 5、console.group 和 console.groupEnd

输出一组信息的开头
    console.group

输出一组信息的结束
    console.groupEnd

## 6、console.table

将表格数据显示为表格

## 7、console.assert

对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台

## 8、console.count
    
统计代码被执行的次数

## 9、console.dir

直接将该DOM结点以DOM树的结构进行输出，可以详细查对象的方法发展等等(比for in方便) 

## 10、console.time 和 console.timeEnd

计时开始
    console.time

计时结束
    console.timeEnd 

## 11、console.profile 和 console.profileEnd

配合一起使用来查看CPU使用相关信息
在 Profiles 面板里面查看就可以看到 cpu 相关使用信息

## 12、console.timeLine 和 console.timeLineEnd

配合一起记录一段时间轴

## 13、console.trace

堆栈跟踪相关的调试

## 14、console.clear

清除控制台

## 15、console.debug

使用日志级别向控制台输出消息"debug"

## 16、console.timeLog

将指定计时器的值记录到控制台。

## 17、console.timeStamp

在浏览器的时间轴或瀑布工具中添加标记

## 18、$_ 命令

返回最近一次表达式执行的结果，功能跟按向上的方向键再回车是一样的

## 参考链接
    
* [Web/API/console](https://developer.mozilla.org/en-US/docs/Web/API/console)

* [console-api](https://developer.chrome.com/devtools/docs/console-api)
