# Css 特效

## Yusuke Nakaya

[GitHub 地址](https://github.com/chokcoco/CSS-Inspiration)

* [日本 CodePen 作者 Yusuke Nakaya 的实例](https://codepen.io/YusukeNakaya/pen/vvEqVx)
    - DOM 元素
    ```js
    import React, { Fragment } from 'react';specialEffects
    import './index.scss';

    class specialEffects extends React.Component {

        // 创建 trigger
        createElement(count, type) {
            let html = [];

            for (let i = 0; i < count; i++) {
                html.push(<div className={type} key={type + i}></div>);
            }
            
            return (html);
        }

        render() {
            let createBox = this.createElement(500, 'box');

            return (
                <Fragment>
                    <div className="bg">hover me</div>
                    <div className="container">
                        {createBox}
                    </div>
                </Fragment>
            );
        }
    }

    export default specialEffects;
    ```

    - css 特效
    ```scss
    $count: 500;
    @function randomNum($max, $min: 0, $u: 1) {
        @return ($min + random($max)) * $u;
    }

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        line-height: 100vh;
        text-align: center;
        font-size: 15vw;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px rgba(118, 218, 255, .8);
        z-index: -1;
    }

    .container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        cursor: pointer;
        z-index: 100;
        .box {
            position: relative;
            float: left;
            width: 30px;
            height: 30px;
            margin: 4px; // mix-blend-mode: multiply;    
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 50%;
                transform: scale3d(0.1, 0.1, 1);
                background-color: transparent;
                transition: .5s transform ease-in, .5s background ease-in;
            }
        }
        .box:hover {
            &::before {
                transform: scale3d(1.8, 1.8, 1.8);
                transition: 0s transform;
            }
        }
    }

    @for $i from 1 through $count {
        .box:nth-child(#{$i}):hover {
            &::before {
                background-color: rgba(randomNum(255), randomNum(255), randomNum(255), .8);
            }
        }
    }
    ```

## css 波纹动画

两张图片重叠，只 `scale` 其中一个图片即可。

```html
<div class="repetBox">
    <div class="transform"></div>
</div>
```


```css
/* 表面不发生变化的圆 */
.repetBox {
    width: 100px;
    height: 100px;
    border: 1px solid #e5e5e5;
    border-radius: 50%;
    position:relative;
}
/* 波纹动画的圆 */
.transform {
    width: 100px;
    height: 100px;
    border: 1px solid #e5e5e5;
    border-radius: 50%;
    position:absolute;
    top: 0px;
    left: 0px;
    cursor: pointer;
    -webkit-animation: scaleout 1.3s infinite ease-in-out;
    animation: scaleout 1.3s infinite ease-in-out;
}
@keyframes scaleout {
    0% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
    }
    100% {
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        opacity: 0;
    }
}
```
