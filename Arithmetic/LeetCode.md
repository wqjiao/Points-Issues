# LeetCode

1. 两数之和

```js
const twoSum = function(nums, target) {
    let map = new Map();
    let res = [];
    nums.forEach((e, i) => map.set(e, i));

    for(let i=0;i<nums.length;i++) {
        let j = map.get(target - nums[i]);
        if(j && j !== i) {
            res = [i, j];
            break;
        }
    }

    return res;
}
```

2. 两数相加

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function(l1, l2) {
     //定义一个新链表res，一个temp的链表cur，用来当作res的指针，一个进位标志carry
    let res = new ListNode(-1),
        cur = res,
        carry = 0;
    while(l1 !== null || l2 !== null){
        //取到两个链表当前的数值
        let num1 = l1 == null ? 0 : l1.val;
        let num2 = l2 == null ? 0 : l2.val;
        //求和
        let sum = num1 + num2 + carry;
        //对进位标志的验证
        carry = sum >= 10 ? 1 : 0;
        cur.next = new ListNode(sum % 10);
        cur = cur.next;
        l1 = l1 ? l1.next : l1;
        l2 = l2 ? l2.next : l2;
    }
    if (carry === 1) {
        cur.next = new ListNode(1);
    }
    return res.next; 

};
```

3. 无重复字符的最长子串

```js
/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function(s) {
    let res = 0; // 用于存放当前最长无重复子串的长度
    let str = ""; // 用于存放无重复子串
    let len = s.length;
    for(let i = 0; i < len; i++) {
      let char = s.charAt(i);
      let index = str.indexOf(char);
      if(index === -1) {
        str += char;
        res = res < str.length ? str.length : res;
      } else {
        str = str.substr(index + 1) + char;
      }
    }
    return res;
};
```

4. 寻找两个有序数组的中位数

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = function(nums1, nums2) {
    let num1 = [...nums1, ...nums2];
    let num = num1.sort((a,b) => {return a-b;});
    let m = parseInt((num.length) / 2);    
    let l =num.length;
    if (l % 2 == 0) {
        return (num[m] + num[m-1])/2;
    } else {
        return num[m];
    }
};
```

7. 整数反转

```js
/**
 * @param {number} x
 * @return {number}
 */
const reverse = function(x) {
    let coefficient = x < 0 ? -1 : 1; // 符号位
    let str = Math.abs(x).toString(); // 取绝对值字符串
    let ret = coefficient * str.split('').reverse().join(''); // 反转后的字符串

    // 数值范围超过 [−231,  231 − 1]
    if (ret > Math.pow(2, 31) -1 || ret < - Math.pow(2, 31)) {
        return 0;
    }

    return ret;
};
```

8. 字符串转换整数 (atoi)

```js
/**
 * @param {string} str
 * @return {number}
 */
const myAtoi = function(str) {
    let res = '';
    let lt0 = false; // 判断是否小于0 最终和32位最大最小数比较有用
    str = str.replace(/^\s+|\s+$/g, ''); // 把开头和结尾的空格去掉
    if(str[0] === '-') { // 如果是以 - 开头
        lt0 = true; // 表明最终是负数
        str = str.substring(1, str.length); // 去掉开头字符
    } else if (str[0] === '+') { 
        str = str.substring(1, str.length); // 去掉开头字符
    }
    let len = str.length;
    for (let i = 0; i < len; i++) {
        regx = /\d+/;
        if (!regx.test(str[i])) { // 如果发现不是数字的，直接结束循环
            break;
        }
        res += str[i];
    }
    if(!res) return 0; // 在 - 或者 `-a`这种情况下， res 此时就是空字符，因此返回 0
    res = lt0 ? -1 * res : res; // 负数需要加上 -
    if(res < -2147483648) return -2147483648;  // 比较大小
    if(res > 2147483647) return 2147483647;
    return res; 
};
```

10. 正则表达式匹配

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function(s, p) {
    let reg = new RegExp(`^${p}$`)
    return reg.test(s)
};
```

11. 盛最多水的容器

```js
/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function(height) {
    let max = 0;
    for (let i = 0, j = height.length-1; i< j; ) {
        // 因为容量受限于矮的一边，所以在向内收缩时，移动矮的一侧
        // 如果新边足够高的话，效果有可能大于宽度收缩带来的负效果
        let minHeight = height[i] > height[j] ? height[j--] : height[i++];
        // 因为上面--或者++，所有要补个+1
        max = Math.max(max, (j-i+1)* minHeight );
    }
    return max

};
```

15. 三数之和

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function(nums) {
    let sortNums = nums.sort((a, b)=> a- b);
    let result = [];

    for (let i = 0; i < sortNums.length - 1; i ++) {
        if(i > 0 && sortNums[i] == sortNums[ i - 1]){
            continue;
        }
        let sum = -sortNums[i],
            end = sortNums.length - 1,
            middle = i + 1;
        
        while (middle < end) {
            if (sortNums[middle] + sortNums[end] + sortNums[i] < 0 || (middle > i + 1 && sortNums[middle] == sortNums[middle - 1])) {
                middle ++;
            } else {
                if (sortNums[middle] + sortNums[end] + sortNums[i] > 0 || (end < sortNums.length - 1 && sortNums[end] == sortNums[end + 1])) {
                    end --;
                } else {
                    result.push([sortNums[i], sortNums[middle], sortNums[end]]);
                    middle++;
                    end--;
                }
            }
        }
    }

    return result;
};
```

16. 最接近的三数之和

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const threeSumClosest = function(nums, target) {
    let sortNums = nums.sort((a, b) => a - b); // 从小到大排序
    let closestNum = sortNums[0] + sortNums[1] + sortNums[2];
    
    for(let i = 0; i < sortNums.length - 1; i ++) {
        let middle = i + 1,
            end = sortNums.length - 1;
        
        while (middle < end) {
            let threeSum = sortNums[i] + sortNums[middle] + sortNums[end];
            if (Math.abs(threeSum - target) < Math.abs(closestNum - target)) {
                closestNum = threeSum;
            }

            if (threeSum > target) {
                end --;
            } else if (threeSum < target) {
                middle ++;
            } else {
                return target;
            }
        }
    }
    return closestNum;
};
```

26. 删除排序数组中的重复项

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function(nums) {
    let number = 0;
    for(let i = 0; i < nums.length; i++) {
        // 相邻两个值比较，不同才做统计操作
        if (nums[i] != nums[number]) {
           number ++;
           nums[number] = nums[i];
        }
    }
    // 不同数字为总量= number+1
    return ++number;
};
```

1389. 按既定顺序创建目标数组

```js
const createTargetArray = (nums, index) => {
    const target = [],
        max = nums.length;

    for (let i = 0; i < max; i++) {
        // 向数组 index[i] 索引位置添加 nums[i]，0代表不删除原位置数据
        target.splice(index[i], 0, nums[i]);
    }
    return target;
}
createTargetArray([0, 1, 2, 3, 4], [0, 1, 2, 2, 1]);
```

1390. 四因数

```js
const sumFourDivisors = function(nums) {
    let ans = 0,
        length = nums.length;

    for (let i = 0; i < length; i++) {
        const temp = help(nums[i]);
        if (temp.size === 4) {
            ans += Array.from(temp.values()).reduce((a, b) => a + b, 0);
        }
    }
    return ans;
};

function help(num) {
    const max = Math.floor(Math.sqrt(num));
    const ans = new Set();
    let min = 1;

    while (min <= max) {
        if ((num / min) % 1 === 0) {
            ans.add(min);
            ans.add(num / min);
        }
        min++;
    }
    return ans;
}

sumFourDivisors([21, 4, 7]);
```
