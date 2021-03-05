# moment.js 时间处理插件

* 创建
```javascript
moment() // 当前时间
moment("1995-12-25") // 1995-12-25
moment("12-25-1995", "MM-DD-YYYY") // 1995-12-25
moment({ year :2010, month :3, day :5, hour :15, minute :10, second :3, millisecond :123})
moment(Date.now() - 24 * 60 * 60 * 1000) // 昨天
moment(new Date(2011, 9, 16)) // 2011-10-16
```

* 格式化
```javascript
moment().format('YYYY年MM月DD日 HH:mm:ss') // 2016年11月11日 22:05:19
moment().format('hh:m:ss') // 10:5:19
moment().format('[YYYY]') // "YYYY"。[] 里的会原样输出。
```

* 转化成 Date 对象
```javascript
moment().toDate()
```

* 获取/设置时间信息
```javascript
moment().second() //获得 秒
moment().second(Number) //设置 秒。0 到 59
moment().minute() //获得 分
moment().minute(Number) //设置 分。0 到 59
```

* 类似的用法
```javascript
moment().hour() // 小时
moment().date() // 一个月里的第几天
moment().day() // 星期几
moment().dayOfYear() // 一年里的第几天
moment().week() // 一年里的第几周
moment().month() // 第几个月
moment().quarter() // 一年里的第几个季度
moment().year() // 年
moment().daysInMonth() // 当前月有多少天
```

* 操作
```javascript
moment().add(7, 'days') // 之后的第7天。第2个参数还可以是 'months', 'years' 等。注意是复数。
moment().add(7, 'd'）// 与上面一行代码的运行结果一样。
moment().add(-6, 'days').format('YYYY-MM-DD') // 获取之前的第6天， YYYY-MM-DD

moment().subtract(1, 'months') // 上个月 seconds/days/months/years/

// 支持 year、month、quarter、week、isoWeek、day、date、hour、minute、second
// quarter 设置为当前季度的开始，月的第一天，上午12:00
// isoWeek 根据ISO 8601，设置为本周的第一天，上午12点
moment().startOf('week') // 这周的第一天
moment().startOf('hour') // 等效与 moment().minutes(0).seconds(0).milliseconds(0)。
moment().startOf('year') // 等效于 moment().month(0).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);

moment().endOf("year") // 设置到当年的最后一天
moment().endOf('week') // 设置到当周的最后一天
moment().endOf('day') // 设置到当天
moment().endOf('hour') // 设置到当天当前小时
moment().endOf('minute') // 设置到当天当时当分
moment().endOf('second') // 设置到当天当时当分当秒

// 返回一个与时间有关的数组
moment().toArray() // [2019, 0, 23, 18, 27, 57, 58]

// 返回一个包含年、月、日、小时、分钟、秒、毫秒的对象
moment().toObject() // {date: 23, hours: 18, milliseconds: 827, minutes: 29, months: 0, seconds: 57, years: 2019}

moment().toString()
```

* 查询，若需要颗粒度细分，第二个参数表示精度，可以查询 年、月、日
```javascript
// 早于
moment('2019-01-20').isBefore('2019-01-21') // true
moment('2019-01-19').isBefore('2019-01-20', 'day') // true
moment('2018-12-20').isBefore('2019-01-20', 'month') // true
moment('2019-01-20').isBefore('2020-01-20', 'year') // true

// 是否相等
moment('2019-01-20').isSame('2019-01-20') // true
moment('2019-01-20').isSame('2019-01-21', 'year')  // true

// 晚于
moment('2019-01-20').isAfter('2019-01-19') // true
moment('2019-01-20').isAfter('2018-01-19', 'year') // true

// 是否相等 或 早于
moment('2019-01-20').isSameOrBefore('2019-01-20') // true
moment('2009-10-20').isSameOrBefore('2019-01-20', 'year')  // true

// 是否相等 或 晚于
moment('2019-01-20').isSameOrAfter('2019-01-20') // true
moment('2020-01-20').isSameOrAfter('2019-01-20', 'year')  // true

// 是否在时间范围内
moment('2019-01-20').isBetween('2019-01-19', '2010-10-25') // true
moment('2019-01-20').isBetween('2018-01-19', '2012-01-01', 'year') // true

// 是否处于夏令
moment([2011, 2, 12]).isDST(); // false, March 12 2011 is not DST
moment([2011, 2, 14]).isDST(); // true, March 14 2011 is DST
```

* 是否是闰年
```javascript
moment().isLeapYear()
```

* 转换日期语言
```javascript
moment.locale('zh-cn')
```

* 获取前6天的时间段

```js
function getDateRange(type) {
    let date;

    if (type === 'day') {
        date = moment().set({hour: 0, minute: 0, second: 0});
    } else if (type === 'week') {
        date = moment()
            .set({hour: 0, minute: 0, second: 0})
            .subtract(6, 'days');
    } else if (type === 'month') {
        date = moment()
            .set({hour: 0, minute: 0, second: 0})
            .subtract(29, 'days');
    }
    let endTime = moment()
        .set({hour: 23, minute: 59, second: 59})
        .format('YYYY-MM-DD HH:mm:ss');
    let beginTime = date.format('YYYY-MM-DD HH:mm:ss');

    return {beginTime, endTime}
}
```

* [moment 官网](http://momentjs.com/docs/#/query/is-after/)
* 与 moment 类似的一个日期处理插件，体积小 [dayjs](https://github.com/iamkun/dayjs)
    > 优点：体积小
    > 缺点：两个项目中引入 dayjs，并在一个项目中执行 dayjs() 传入另一个项目使用 dayjs.isDayjs(time) 时返回 false
