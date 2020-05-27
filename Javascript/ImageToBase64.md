---
title: 图片类型转换的那点小事(url blob base64)
date: 2019-03-09
categories: web 前端
tags: 
- base64
- blob
- Java
---
项目中遇到将图片转换成 base64 的情况，然后在网上收集了一些信息，看了 [玩转图片流](https://juejin.im/entry/5a640069518825735300b4ee) 文章，汇总了 js 是如何做到 URL -> base64 -> blob -> base64 之间的相互转换，以及 Java 中又是如何对图片进行 base64、blob的编码和解码。
<!-- more -->
# 一、js 中 url、base64、blob 转换

url => base64 => blob => base64

## url 转换成 base64

通常情况下，页面中的图片都是以 URL 的格式出现，而实际上图片的 URL 形式是需要经过一次 HTTP 请求。base64 格式的图片却可以少一次 HTTP 请求，但是浏览器不会缓存这种图片。如果图片比较大，而且色彩层次比较丰富，那么 base64 编码后的字符串会非常大，会明显增加 HTML 页面，影响加载速度。页面中的 Loading icon 图片比较小，可以使用 base64 编码后得字符串格式。
一般项目中 '图片编辑' 的需求会使用到 base64：比如，经过 canvas 绘图工具编辑后的图片，利用 canvas.toDataURL 转换成 base64，再通过接口上传到第三方云空间，获取图片 url，展示在页面中。

```javascript
// 原理： 利用 canvas.toDataURL 的 API 转化成 base64
function getDataUri(url) {
    return new Promise((resolve, reject) => {
        /* eslint-disable */
        let image = new Image();

        // CORS 策略，会存在跨域问题 https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
        image.setAttribute("crossOrigin", 'Anonymous'); // 允许跨域获取该图片
        
        image.src = url;

        image.onload = function () {
            let canvas = document.createElement('canvas'),
                width = image.width, // canvas的尺寸和图片一样
                height = image.height;

            canvas.width = width;
            canvas.height = height;

            canvas.getContext('2d').drawImage(this, 0, 0, width, height);
            // Data URI
            resolve(canvas.toDataURL('image/png'));
        };

        // console.log(image.src);
        image.onerror = () => {
            reject(new Error('图片流异常'));
        };
    });
}

// url -> base64
getDataUri(imageUrl).then(res => {
    // 转化后的 base64 图片地址
    console.log('base64', res);
});
```

如果上述代码中没有引入 `image.setAttribute("crossOrigin", 'Anonymous')`，在运行时，`toDataURL()` 这个方法会报错：
```
Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
```

大致的意思是'被修改的画布不能被导出'。没有得到 `CORS`(Cross-domain resource sharing) 权限。

不过 [stackoverflow](https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror) 上已经有人给出了解决方法，使用 `image.setAttribute("crossOrigin", 'Anonymous')` 获得 `CORS` 权限。

## base64 转换成 blob

```javascript
// 原理：利用 URL.createObjectURL() 为 blob 对象创建临时的 URL
function base64ToBlob ({b64data = '', contentType = '', sliceSize = 512} = {}) {
    return new Promise((resolve, reject) => {
        // 使用 atob() 方法将数据解码
        let byteCharacters = atob(b64data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);
            let byteNumbers = [];

            for (let i = 0; i < slice.length; i++) {
                byteNumbers.push(slice.charCodeAt(i));
            }
            // 8 位无符号整数值的类型化数组。内容将初始化为 0。
            // 如果无法分配请求数目的字节，则将引发异常。
            byteArrays.push(new Uint8Array(byteNumbers));
        }

        let result = new Blob(byteArrays, {
            type: contentType
        });

        result = Object.assign(result, {
            // jartto: 这里一定要处理一下 URL.createObjectURL
            preview: URL.createObjectURL(result),
            name: `图片示例.png`
        });

        resolve(result);
    });
}

// 处理 blob 对象
function createMiniQrcode (blob) {
    let img = document.createElement('img');

    img.onload = function (e) {
        // 元素的 onload 事件触发后将销毁 URL 对象, 释放内存。
        window.URL.revokeObjectURL(img.src);
    }
    // 浏览器允许使用 URL.createObjectURL() 方法，针对 Blob 对象生成一个临时 URL。
    // 这个 URL 以 blob:// 开头,表明对应一个 Blob 对象。
    img.src = window.URL.createObjectURL(blob);

    document.querySelector('.imgQrCode').appendChild(img);
}

let base64 = res.split(',')[1];

this.base64ToBlob({b64data: base64, contentType: 'image/png'}).then(res => {
    // 转后后的 blob 对象
    console.log('blob', res);
    this.createMiniQrcode(res); // 处理 blob 对象，生成临时 URL
});
```

* `atob()` 是对 base64 编码过得字符串进行解码

```javascript
let encodedData = window.btoa("Hello, world"); // 编码
let decodedData = window.atob(encodedData); // 解码
```

* `new Uint8Array()`
Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为 0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。

* `new Blob()` 
构造函数 Blob，创建一个 Blob 对象。
new Blob(array, options);

array 是一个由 ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成的 Array ，或者其他类似对象的混合体，它将会被放进 Blob。DOMStrings 会被编码为 UTF-8。
options 是一个可选的 BlobPropertyBag 字典，它可能会指定如下两个属性：
    type，默认值为 ""，它代表了将会被放入到blob中的数组内容的 [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)，比如 'image/png'。
    endings，默认值为 "transparent"，用于指定包含行结束符\n的字符串如何被写入。 它是以下两个值中的一个： "native"，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 "transparent"，代表会保持blob中保存的结束符不变 
    
跟 Blob 类似的还有一个 `new File()`，构造函数 File，创建一个 File 对象。
通常情况下， File 对象是来自用户在一个 `<input>`元素上选择文件后返回的 FileList 对象,也可以是来自由拖放操作生成的 DataTransfer 对象，或者来自 HTMLCanvasElement 上的 mozGetAsFile() API。在Gecko中，特权代码可以创建代表任何本地文件的File对象，而无需用户交互。
```
new File( Array parts, String filename, BlobPropertyBag properties);
var myFile = new File(bits, name[, options]);
```

- bits
    ArrayBuffer，ArrayBufferView，Blob，或者 DOMString 对象的 Array — 或者任何这些对象的组合。这是 UTF-8 编码的文件内容。

- name
    USVString，表示文件名称，或者文件路径。

- options 可选，选项对象，包含文件的可选属性。可用的选项如下：
    type: DOMString，表示将要放到文件中的内容的 MIME 类型。默认值为 "" 。
    lastModified: 数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。默认值为 Date.now()

```
<!-- 示例 -->
var file = new File(["foo"], "foo.txt", {
    type: "text/plain",
});
```

File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。比如说， FileReader, URL.createObjectURL(), createImageBitmap(), 及 XMLHttpRequest.send() 都能处理 Blob 和 File。

* `URL.createObjectURL()` 为 Blob 或 File 对象创建 URL
    URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的 URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的 URL 对象表示指定的 File 对象或 Blob 对象。
    DOMString 是一个 UTF-16 字符串。由于JavaScript已经使用了这样的字符串，所以DOMString 直接映射到 一个String。

## blob 转 base64

```javascript
// 原理：利用 fileReader 的 readAsDataURL，将 blob 转为 base64
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            resolve(e.target.result);
        };
        // readAsDataURL
        fileReader.readAsDataURL(blob);
        fileReader.onerror = () => {
            reject(new Error('文件流异常'));
        };
    });
}

this.blobToBase64(blob).then(res => {
    // 转化后的base64
    console.log('base64', res);
});
```
[FileReader()](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 使用 File 或 Blob 对象指定要读取的文件或数据
[FileReader.readAsDataURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL) 读取指定的 Blob 或 File 对象的内容，读取完成后，result 属性中将包含 `data: URL` 表示文件的数据为 base64 编码的字符串。

## 总结

通常情况下，图片不会直接存储到数据库中，而只是将图片的路径存储到数据库中，需要展示图片的时候只需要连接磁盘路径把图片载入进来即可，这样不会影响数据库。对数据库的调优感兴趣可 [戳这里](https://www.cnblogs.com/zwl715/p/3896445.html)

## 参考网址

[玩转图片流](https://juejin.im/entry/5a640069518825735300b4ee)
[base64 blob 转换](https://juejin.im/post/5c6276956fb9a04a06055925)

# 二、Java 中 url、base64、blob 转换

```java
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.io.InputStream;
import java.io.IOException;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class ImageUtils {

    public static boolean generateImage(String imgStr, String path) {
        if (imgStr == null) return false;

        BASE64Decoder decoder = new BASE64Decoder();
        try {
            byte[] b = decoder.decodeBuffer(imgStr);

            for (int i = 0; i < b.length; ++i) {
                if (b[i] < 0) {
                    b[i] += 256;
                }
            }

            OutputStream out = new FileOutputStream(path);

            out.write(b);
            out.flush();
            out.close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static String getImageStr(String imgFile) {
        InputStream inputStream = null;

        byte[] data = null;

        try {
            inputStream = new FileInputStream(imgFile);
            data = new byte[inputStream.available()];
            inputStream.read(data);
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        BASE64Encoder encoder = new BASE64Encoder();
        
        return encoder.encode(data);
    }

    public static void main(String[] args) {
        String strImg = getImageStr("D:/images/111.png");
        System.out.println(strImg);
        generateImage(strImg, "D:/images/222.png");
    }
}
```

## 更多文章看这里哦!!!

* [wqjiao 个人博客](https://wqjiao.github.io)
* [wqjiao 掘进文章](https://juejin.im/user/5a9c9998f265da239a5f459b)
* [wqjiao GitHub](https://github.com/wqjiao)
