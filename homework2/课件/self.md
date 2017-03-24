*ES6*



**let和var的区别：**

var:(作用域链)

**变量提升:**

var x = 10;

var a = function(){

console.log(x);//undefined

var x = 1;

} 

**变量泄露:**

var a = [];

for (var i = 0; i < 10; i++) {   

	a[i] = function () {

		console.log(i);

	}

}

a\[5\]();//10

let:变量不提升 块级作用域（不可读取外都声明的变量）









