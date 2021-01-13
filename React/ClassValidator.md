# class-validator

类校验：可以采用装饰器或非装饰器的方式，详见源码 [class-validator](https://github.com/typestack/class-validator)

## 一、引入

```
yarn add class-validator
npm install class-validator
```

## 二、语法

### 2.1、@type 装饰器

* 在装饰器上指定类型及消息

```js
import { MinLength, MaxLength } from 'class-validator';

export class Post {
    @MinLength(10, {
        message: 'Title is too short',
    })
    @MaxLength(50, {
        message: 'Title is too long',
    })
    title: string;
}
```

* 特殊的 `tokens` 可以在 `message` 中使用

    > `$value` - 正在被验证的真实值
    > `$property` - 要验证的对象属性的名称
    > `$target` - 要验证的对象的类的名称
    > `$constraint1`, `$constraint2`, ... `$constraintN` - 由特定验证类型定义的约束

### 2.2、validate

```js
validator.validate(post, { validationError: { target: false } });
```

* ValidatorOptions

```js
export interface ValidatorOptions {
    skipMissingProperties?: boolean;
    whitelist?: boolean;
    forbidNonWhitelisted?: boolean;
    groups?: string[];
    dismissDefaultMessages?: boolean;
    validationError?: {
            target?: boolean;
            value?: boolean;
    };
    forbidUnknownValues?: boolean;
    stopAtFirstError?: boolean;
}
```

* ValidationError

`validate` 返回一个对象数组 `ValidationError`:
```js
export interface ValidationError = {
    target: Object; // Object that was validated.
    property: string; // Object's property that haven't pass validation.
    value: any; // Value that haven't pass a validation.
    constraints?: { // Constraints that failed validation with error messages.
        [type: string]: string;
    };
    children?: ValidationError[]; // Contains all nested validation errors of the property
}
```

### 2.3、示例代码

```js
import {
    validate,
    validateOrReject,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
} from 'class-validator';

export class Post {
    @MaxLength(20, {
        each: true,
    })
    tags: string[]; // 数组
    // tags: Set<string>; // 集合

    @Length(10, 20)
    title: string;

    @Contains('hello')
    text: string;

    @IsInt()
    @Min(0)
    @Max(10)
    rating: number;

    @IsEmail()
    email: string;

    @IsFQDN()
    site: string;

    @IsDate()
    createDate: Date;
}

let post = new Post();
post.title = 'Hello'; // should not pass
post.text = 'this is a great post about hell world'; // should not pass
post.rating = 11; // should not pass
post.email = 'google.com'; // should not pass
post.site = 'googlecom'; // should not pass

validate(post).then(errors => {
    // errors is an array of validation errors
    if (errors.length > 0) {
        console.log('validation failed. errors: ', errors);
    } else {
        console.log('validation succeed');
    }
});

validateOrReject(post).catch(errors => {
    console.log('Promise rejected (validation failed). Errors: ', errors);
});
// or
async function validateOrRejectExample(input) {
    try {
        await validateOrReject(input);
    } catch (errors) {
        console.log('Caught promise rejection (validation failed). Errors: ', errors);
    }
}
```
