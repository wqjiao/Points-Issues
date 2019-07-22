# html5 head 标签

## 一、html lang 属性
以前我们常用的是 `<html lang="zh-CN">` 或简写的 `<html lang="zh">`，但实际上 [W3 language tags](https://www.w3.org/International/articles/language-tags/) 推荐使用 `zh-Hans 简体中文`、`zh-Hant 繁体中文`，可以提高一致性和准确。

![](../assets/zh-hant.png)

## 二、meta 标签

* 1.声明文档使用的字符编码
    - `<meta charset="utf-8">` 用于 `HTML5`
    - `<meta http-equiv="Content-Type" content="text/html; charset=utf-8">` 用于 `HTML4` 或者 `XHTML` 或用于过时的 dom 解析器

    通常我们会使用短的。实际上，在 `HTML5` 中，以上两种是等价的，只是短的更容易被记住。更多对比见 [stackoverflow](https://stackoverflow.com/questions/4696499/meta-charset-utf-8-vs-meta-http-equiv-content-type)

* 2.优先使用 IE 最新版本和 Chrome
    ```html
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    ```

* 3.360 使用 Google Chrome Frame
    ```html
    <!-- 如果没有安装 GCF(Google Chrome Frame)，使用最高版本的IE内核渲染 -->
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    ```
    具体详情见 [360 浏览器内核控制](http://se.360.cn/v6/help/meta.html)

    ```html
    <!-- 强制使用webkit渲染 -->
    <meta name="renderer" content="webkit"> 
    <meta name="force-rendering" content="webkit">
    ```

* 4.百度禁止转码
    在使用百度移动搜索时，百度会自动将网站进行转码，添加一些烦人的广告，如果我们不做百度广告，是可以通过 `meta` 标签禁止网站被转码
    ```html
    <meta http-equiv="Cache-Control" content="no-transform" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <!-- 表示页面同时适合在移动设备和PC上进行浏览 -->
    <meta name="applicable-device" content="pc,mobile">
    ```
    
    相关网站:
    - [百度移动搜索](https://ziyuan.baidu.com/college/articleinfo?id=156)
    - [起飞页网站](https://www.qifeiye.com/%E5%A6%82%E4%BD%95%E7%A6%81%E6%AD%A2%E7%99%BE%E5%BA%A6baidu%E7%A7%BB%E5%8A%A8%E6%90%9C%E7%B4%A2%E8%87%AA%E5%8A%A8%E8%BD%AC%E7%A0%812017%E5%B9%B4%E6%9B%B4%E6%96%B0/)
    - [博客](https://www.myw3c.com/jilu/532.html)



* 5.SEO 优化
    - 页面标题 title
    ```html
    <title>your title</title>
    ```
    
    - 页面关键词 keywords
    ```html
    <meta name="keywords" content="your keywords">
    ```
    
    - 页面描述内容 description
    ```html
    <meta name="description" content="your description">
    ```

    - 定义网页作者 author
    ```html
    <meta name="author" content="author,email address">
    ```

    - 定义网页搜索引擎索引方式 [SEO--Robots](https://www.cnblogs.com/wenanry/archive/2010/10/25/1860639.html)
    ```html
    <meta name="robots" content="index,follow">
    ```
    ![](../assets/seorobots.png)

* 6.为移动设备添加 `viewport`,可以让布局在移动浏览器上显示的更好

    ```html
    <meta
        name ="viewport"
        content ="
            width=device-width,
            initial-scale=1.0,
            maximum-scale=3.0,
            minimum-scale=1.0,
            user-scalable=no
        "
    >
    ```

    `width=device-width` 会导致 iPhone5 添加到主屏后以 WebApp 全屏模式打开页面时出现[黑边](http://bigc.at/ios-webapp-viewport-meta.orz)

    ![](../assets/viewport.png)

    注意： `minimal-ui` iOS8 中已经删除

* 7.ios 设备

    - 添加到主屏后的标题（iOS 6 新增）
    ```html
    <meta name="apple-mobile-web-app-title" content="标题">
    ```

    - 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
    ```html
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    ```

    - 设置状态栏的背景颜色
    ```html
    <!-- 在 "apple-mobile-web-app-capable" content="yes" 时生效 -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    ```
    [content 参数](http://blog.jayself.com/2014/03/22/meta/)
    ```
    default 默认值。
    black 状态栏背景是黑色。
    black-translucent 状态栏背景是黑色半透明。
        如果设置为 default 或 black ,网页内容从状态栏底部开始。
        如果设置为 black-translucent ,网页内容充满整个屏幕，顶部会被状态栏遮挡。
    ```

    - 禁止数字识自动别为电话号码
    ```html
    <meta name="format-detection" content="telephone=no" />
    <!-- 电话号码、邮箱 -->
    <meta name="format-detection" content="telephone=no,email=no" />
    ```

    - 添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
    ```html
    <meta
        name="apple-itunes-app"
        content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL"
    > 
    ```
    content 属性可以传三个参数，以逗号隔开:
    ```
    app-id(必选) 填写应用在APPStrore的ID 
    affiliate-data(可选) 是iTunes 分销联盟计划的ID 一般用不到。
    app-argument（可选）点击『打开』给APP传参数
    ```

* 8.关闭 chrome 浏览器下翻译插件
    ```html
    <meta name="google" value="notranslate" />
    ```

* 9.去除手机半透明背景

    - ios 点击链接，会出现一个半透明灰色遮罩
    ```
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    ```

    - android 点击链接，会出现一个边框或者半透明灰色遮罩, 不同生产商定义出来额效果不一样，可以做一下设置去除部分机器自带的效果
    ```
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    ```

    - windows phone 系统，点击标签产生的灰色半透明背景，添加 `meta` 标签去除
    ```html
    <meta name="msapplication-tap-highlight" content="no">
    ```
    注意：部分机型可能去除不了，如果是按钮，可以避免使用 `a`、`input`，使用 `div` 代替

* 10.刷新浏览器
    content -- 时间;网址
    ```html
    <meta http-equiv="Refresh" content="2;URL=http://www.baidu.com">
    ```

* 11.强制竖屏与全屏
    landscape -- 横屏;portrait -- 竖屏
    ```html
    <!-- UC强制竖屏 -->
    <meta name="screen-orientation" content="portrait">
    <!-- QQ强制竖屏 -->
    <meta name="x5-orientation" content="portrait">
    <!-- UC强制全屏 -->
    <meta name="full-screen" content="yes">
    <!-- QQ强制全屏 -->
    <meta name="x5-fullscreen" content="true">
    ```

* 12.应用模式

    ```html
    <!-- UC应用模式:默认全屏，禁止长按菜单，禁止手势，标准排版，强制图片显示 -->
    <meta name="browsermode" content="application">
    <!-- QQ应用模式 -->
    <meta name="x5-page-mode" content="app">
    ```

    `browsermode` 作用：
    ![](../assets/browermode.png)

    ```html
    <!-- UC使用适屏模式显示 -->
    <meta name="layoutmode" content="fitscreen">
    <!-- UC强制图片显示 -->
    <meta name="imagemode" content="force">
    <!-- UC禁止夜间模式显示 enable|disable -->
    <meta name="nightmode" content="disable">
    <!-- UC当页面有太多文字时禁止缩放 -->
    <meta name="wap-font-scale" content="no">  
    ```

* 13.UC排版模式

    UC 浏览器提供两种排版模式，分别是适屏模式（fitscreen）及标准模式（standard），其中适屏模式简化了一些页面的处理，使得页面内容更适合进行页面阅读、节省流量及响应更快，而标准模式则能按照标准规范对页面进行排版及渲染。

    ```html
    <meta name="layoutmode" content="fitscreen|standard">
    ```

* 14.cookie 设定指定时间后删除
    ```html
    <!-- Set-Cookie(cookie设定):如果网页过期，那么存盘的cookie将被删除 GMT格式 -->
    <meta
        http-equiv="Set-Cookie"
        content="cookie value=xxx;expires=Friday,12-Jan-200118:18:18GMT;path=/"
    >
    ```

## 三、参考链接

* [SEO--Robots](https://www.cnblogs.com/wenanry/archive/2010/10/25/1860639.html)
* [移动端头部 meta 大全](https://gist.github.com/overtrue/f540fbea3c33e3da53fd)
