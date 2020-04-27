# async-validator

[async-validator](https://github.com/yiminghe/async-validator) 是个纯 js 库，可以对数据进行异步校验。`async-validator` 是基于早期的 [async-validate](https://github.com/tmpfs/async-validate) 进行修改的，但是早期出现的 `async-validate` 并没有得到更多的人使用，反而基于它做了修改的 `async-validator` 引起很多人的关注并使用，目前 star 数在 `5.2K`，对于表单验证可谓是相当的好用。一直好奇 `ant.design` 中 `Form` 的表单检验是怎么做的。

[ant.design form](https://github.com/ant-design/ant-design/tree/master/components/form) 使用了 [rc-form](https://github.com/react-component/form) 封装了 `Form` 组件，而 `rc-form` 中使用了 `async-validator` 插件对表单进行的校验。
[element-ui](https://github.com/ElemeFE/element/blob/dev/packages/form/src/form-item.vue) 中也是使用了 `async-validator` 做的表单验证。

```js
import schema from 'async-validator';

let descriptor = {
    name: {
        type: "string",
        required: true,
        validator: (rule, value) => value === 'muji',
    },
    age: {
        type: "number",
        asyncValidator: (rule, value) => {
            return new Promise((resolve, reject) => {
                if (value < 18) {
                    reject("too young");  // reject with error message
                } else {
                    resolve();
                }
            });
        }
    },
    address: {
        validator(rule, value, callback){
            return value === 'test';
        },
        message: 'Value is not equal to "test".',
    }
};
let validator = new schema(descriptor);
validator.validate({name: "muji"}, (errors, fields) => {
    if(errors) {
        // validation failed, errors is an array of all errors
        // fields is an object keyed by field name with an array of
        // errors per field
        return handleErrors(errors, fields);
    }
    // validation passed
});

// PROMISE USAGE
validator.validate({ name: "muji", age: 16 }).then(() => {
    // validation passed or without error message
}).catch(({ errors, fields }) => {
    return handleErrors(errors, fields);
})
```

* 必填 `required`

表示该字段是否必填

* 空格 `whitespace`

表示输入的字符串前面是否允许出现多个(一个以上)连续的空格

* 类型 `type`

表示允许该字段接收值的类型

- `integer` -- 整形
- `float` -- 浮点型
- `array` -- 数组
- `regexp` -- 正则表达式
- `object` -- 对象
- `method` -- 函数 function
- `email` -- 邮箱
- `number` -- 数字
- `date` -- 日期 new Date()
- `url` -- 网址
- `hex` -- 十六进制数

* 区间 `range`

表示该字段接受值的长度，允许的最小最大数值区间

- `length` -- 固定长度
- `min` -- 最小值
- `max` -- 最大值
- `range` -- [最小值, 最大值]

* 枚举 `enum`

枚举允许该字段的值，至少符合其中一个

* 正则 `pattern`

通过正则表达式匹配该字段接收值是否符合要求

