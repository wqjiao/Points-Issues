# Canvas 绘图

## 初始 Canvas
    
* canvas - 定义

    HTML5 元素用于图形的绘制，通过脚本 (通常是 JavaScript) 来完成.

    canvas 标签只是图形容器，必须使用脚本来绘制图形。通过多种方法使用 canvas 绘制路径,盒、圆、字符以及添加图像。

* Canvas - Can i use

    ![](../assets/Can i use.png)

* Canvas - 坐标

    canvas 默认左上角为原点 (0,0)，横向 x，纵向 y

* Canvas - 路径

    - 在 Canvas 上画线，我们将使用以下两种方法：

        moveTo(x, y) 定义线条开始坐标

        lineTo(x, y) 定义线条结束坐标

        定义开始坐标(0,0), 和结束坐标 (200, 100)。然后使用 stroke() 方法来绘制线条
    
    - 在canvas中绘制圆形, 我们将使用以下方法，并使用 stroke() 或者 fill() 绘制线条或填充
        ```
        beginPath() // 开始路线
        arc(x, y, r, start, stop) // 绘制圆形
        stroke() || fill() // 描边 或 填充
        ```

* Canvas - 文本

    使用 canvas 绘制文本，重要的属性和方法如下：

        font - 定义字体

        fillText(text,x,y) - 在 canvas 上绘制实心的文本

        strokeText(text,x,y) - 在 canvas 上绘制空心的文本

* Canvas - 渐变

    渐变可以填充在矩形, 圆形, 线条, 文本等等, 各种形状可以自己定义不同的颜色。

    以下有两种不同的方式来设置 Canvas 渐变：

        createLinearGradient(x, y, x1, y1) - 创建线条渐变

        createRadialGradient(x, y, r, x1, y1, r1) - 创建一个径向/圆渐变

    注意：
    
        当我们使用渐变对象，必须使用两种或两种以上的停止颜色。

        addColorStop() 方法指定颜色停止，参数使用坐标来描述，可以是 0 至 1.

        使用渐变，设置 fillStyle 或 strokeStyle 的值为 渐变，然后绘制形状，如矩形，文本，或一条线。

* Canvas - 图像

    把一幅图像放置到画布上, 使用以下方法: drawImage(image,x,y)

* javascript 实例
    
    ```
    <img id="scream" src="./assets/scream.png" alt="The Scream" width="220" height="277" style="display:none">
    <canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>

    <script>
        var c = document.getElementById("myCanvas");  // 获取画布
        var ctx = c.getContext("2d"); // 创建 context 对象

        <!-- Canvas - 坐标 -->
        ctx.fillStyle = "#FF0000"; // 填充画布背景色，默认#000000
        ctx.fillRect(0, 0, 150, 75); // 填充区域（x, y, width, height）

        <!-- Canvas - 路径 线 -->
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 100);
        ctx.stroke();

        <!-- Canvas - 坐标 圆形 -->
        ctx.beginPath();
        ctx.arc(95, 50, 40, 0, 2*Math.PI);
        ctx.stroke();

        <!-- Canvas - 文本 -->
        ctx.font = '30px Arial';
        ctx.fillText('Hello World', 10, 50); // 实心文本
        ctx.strokeText("Hello World",10,50); // 空心文本

        <!-- Canvas - 渐变 -->
        // 创建渐变
        var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100); // 径向渐变
        var grd = ctx.createLinearGradient(0, 0 , 200, 0); // 线性渐变
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "white");
        
        // 填充渐变
        ctx.fillStyle = grd;
        ctx.fillRect(10, 10, 150, 80);

        <!-- Canvas - 图像 -->
        var img = document.getElementById('scream');
        img.onload = function() {
            ctx.drawImage(img, 10, 10);
        }
    </script>
    ```

## 深入 Canvas

* 颜色、样式和阴影
    - 属性

        fillStyle	设置或返回用于填充绘画的颜色、渐变或模式。

        strokeStyle	设置或返回用于笔触的颜色、渐变或模式。

        shadowColor	设置或返回用于阴影的颜色。

        shadowBlur	设置或返回用于阴影的模糊级别。

        shadowOffsetX	设置或返回阴影与形状的水平距离。

        shadowOffsetY	设置或返回阴影与形状的垂直距离。

    - 方法

        createLinearGradient()	创建线性渐变（用在画布内容上）。
        
        createPattern()	在指定的方向上重复指定的元素。

        createRadialGradient()	创建放射状/环形的渐变（用在画布内容上）。
        
        addColorStop()	规定渐变对象中的颜色和停止位置。

* 线条样式 - 属性

    lineCap	设置或返回线条的结束端点样式。

    lineJoin	设置或返回两条线相交时，所创建的拐角类型。

    lineWidth	设置或返回当前的线条宽度。

    miterLimit	设置或返回最大斜接长度。

* 矩形 - 方法

    rect()	创建矩形。

    fillRect()	绘制"被填充"的矩形。

    strokeRect()	绘制矩形（无填充）。

    clearRect()	在给定的矩形内清除指定的像素。

* 路径 - 方法

    fill()	填充当前绘图（路径）。

    stroke()	绘制已定义的路径。

    beginPath()	起始一条路径，或重置当前路径。

    moveTo()	把路径移动到画布中的指定点，不创建线条。

    closePath()	创建从当前点回到起始点的路径。

    lineTo()	添加一个新点，然后在画布中创建从该点到最后指定点的线条。

    clip()	从原始画布剪切任意形状和尺寸的区域。

    quadraticCurveTo()	创建二次贝塞尔曲线。

    bezierCurveTo()	创建三次贝塞尔曲线。

    arc()	创建弧/曲线（用于创建圆形或部分圆）。

    arcTo()	创建两切线之间的弧/曲线。

    isPointInPath()	如果指定的点位于当前路径中，则返回 true，否则返回 false。

* 转换 - 方法

    scale()	缩放当前绘图至更大或更小。

    rotate()	旋转当前绘图。

    translate()	重新映射画布上的 (0,0) 位置。

    transform()	替换绘图的当前转换矩阵。

    setTransform()	将当前转换重置为单位矩阵。然后运行 transform()。

* 文本

    - 属性

        font	设置或返回文本内容的当前字体属性。

        textAlign	设置或返回文本内容的当前对齐方式。

        textBaseline	设置或返回在绘制文本时使用的当前文本基线。

    - 方法

        fillText()	在画布上绘制"被填充的"文本。
    
        strokeText()	在画布上绘制文本（无填充）。
    
        measureText()	返回包含指定文本宽度的对象。

* 图像绘制 - 方法

    drawImage()	向画布上绘制图像、画布或视频。

* 像素操作

    - 属性

        width	返回 ImageData 对象的宽度。

        height	返回 ImageData 对象的高度。
        
        data	返回一个对象，其包含指定的 ImageData 对象的图像数据。

    - 方法

        createImageData()	创建新的、空白的 ImageData 对象。

        getImageData()	返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据。

        putImageData()	把图像数据（从指定的 ImageData 对象）放回画布上。

* 合成 -属性

    globalAlpha	设置或返回绘图的当前 alpha 或透明值。

    globalCompositeOperation	设置或返回新图像如何绘制到已有的图像上。

* 其他 - 方法

    save()	保存当前环境的状态。

    restore()	返回之前保存过的路径状态和属性。

    createEvent()
    
    getContext()
    
    toDataURL()
    