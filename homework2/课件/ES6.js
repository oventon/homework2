'use strict';

//全局变量

var x = 1;

console.log(window.x);

//函数作用域  只能在函数体内访问  外部访问不到

var x = 1;

function a () {

	var x = 2;

	console.log(x);//2

}

a();

console.log(x);



// 变量提升 ——> 变量覆盖 

var x = new Date();

function a() {

	console.log(x);

	if (false) {

		var x = "xxxx";

	}

}

a();//undefined





//变量泄露

var a = [];

for (var i = 0; i < 10; i++) {

	a[i] = function () {

		console.log(i);

	}

}

a[5]();//10


for (var i = 0; i < 10; i++) {

	(function (j) {

		a[j] = function () {

			console.log(j);

		}

	})(i);

}

 

//let 块级作用域 {} 用完即销毁

{

	let a = 1;

}

console.log(a);



var a = [];

for (let i = 0; i < 10; i++) {

	a[i] = function () {

		console.log(i);

	}

}

a[5]();//5



//同一作用域块不可重复声明  同列for循环

{

	let a = 1;

	let a = 2;
	//报错 不可重复声明
}

//变量提升 --no

{

	console.log(a);

	let a = 1;
	// not defined  没定义
}

//锁区 

var x = 'aaa';

if (true) {

	// x = 'bbb';

	let x = 'ccc';

}

console.log(x);



//const like let 只读

const a = 1;

a = 2; //error

const a = [];//指针

a[1] = 1;

a = 'xxx';//error



// let 和 const 不再绑定到全局对象上

var x = 1;

window.x; //1

let a = 2;

window.a;//undefined





//解构赋值  模式匹配 按照一定的模式从数组和对象中提取值，对变量进行赋值



//数组按照顺序匹配

let a = 1,

    b = 2,

    c = 3;

let [a, b, c] = [1, 2, 3];



let [a] = [] //undefined



let [a, [b, c], d] = [1, [2], 3];//嵌套



//对位值严格等于undefined，默认值才生效

let [a = 1] = [];

let [a = 2] = [undefined];



//对象按照属性名匹配 进行复赋值

let {foo, baz} = {foo: "asd", baz:"sss"}; //变量名与属性名一致

let {foo: foo, baz: baz} = {foo: 'asd', baz: 'sss'};

let {foo: baz} = {foo: "asd", baz: "sss"}; //变量名与属性名不一致



let foo;

let {foo} = {foo: "asd"}; //重复命名

({foo} = {foo: 'asd'});



//模式嵌套赋值

let Z= {

	dad: {

		mom: "mary",

		dad: "jack"

	}

}



//将对象的值，方法取出，更方便使用

let {dad:{dad:grandF}} = Z;

let {cos, sin} = Math;



//函数的解构赋值 默认值

function a({x, y}) {

	console.log(x, y);

}

a({1, 2});



function a({x, y = 2}) {

	console.log(x, y);

}

a({1});



function a(x, y = 2) {

	console.log(x, y);

}

a(1);//error

//多个参数传入

function ajax({url, method, data}){

	console.log(url);



}

//参数多时，使用解构



function m1({x = 0, y = 0} = {}) {

  console.log(x, y);

}



function m2({x, y} = { x: 0, y: 0 }) {

  console.log(x, y);

}

// 函数没有参数的情况

m1() // [0, 0]

m2() // [0, 0]



// x和y都有值的情况

m1({x: 3, y: 8}) // [3, 8]

m2({x: 3, y: 8}) // [3, 8]



// x有值，y无值的情况

m1({x: 3}) // [3, 0]

m2({x: 3}) // [3, undefined]



// x和y都无值的情况

m1({}) // [0, 0];

m2({}) // [undefined, undefined]



m1({z: 3}) // [0, 0]

m2({z: 3}) // [undefined, undefined]



//圆括号   一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

// 尽量不要使用圆括号

// 变量声明中 不能使用

let [(a)] = [1];

// 模式嵌套不能使用圆括号

[({ p: a }), { x: c }] = [{}, {}];



//用途

//交换变量的值

let a = 1;

let b = 1;

let tmp;

[a, b] = [b, a];



//函数的多值返回 以前的多值返回，返回一个对象，但如果多值没有类似处，使用对象返回，在外面解析，发生语义理解错误

//返回一个数组，取值麻烦，不够简明，不能让人一看就知道这个值是干什么的

//需要解构

function m() {

	return Math;

}

let {cos, sin} = m();



//JSON数据

let jsonData = {

  id: 42,

  status: 200,

  data: [867, 5309]

};



let { id, status, data: number } = jsonData;







//for ... of

//最早的遍历

let a = [1, 2, 3, 4];

for (let i = 0; i < a.length - 1; i ++) {};



// 为了精简

a.forEach(function (x) {

	//代码

});// 不能跳出循环 也不能return



//有了for in

let o = [1, 2, 3]

for (let m in o) {

	console.log(typeof o);//string

}//对数组不友好, 适用对象



// 然后 for ... of Iterator

let a = [1, 2, 3, 4];//数组

for (let x of a) {

	console.log(x);

	if (x === 3) {

		break;

	}

}

//[Symbol.iterator]()

let a = [1, 2, 3];

let m  =a[Symbol.iterator]();

console.log(m);

console.log(m.next());

//内置该接口的有数组，Set, Map, 但也可以自己给对象扩展

function makeIterator(array) {

  var nextIndex = 0;

  return {

    next: function() {

      return nextIndex < array.length ?

        {value: array[nextIndex++], done: false} :

        {value: undefined, done: true};

    }

  };

}



//Set  去重

let a = new Set([1, 2, 2, 3, 3, 4]);

for (let x of a) {

	console.log(x);

}

console.log(a.size);

//Map  值值对

let map = new Map([

  ['F', 'no'], //数组方式提供键值   值值对

  ['T',  'yes'],

]);





//数组扩展 

Array.from(node, func) //将类数组对象和可遍历对象转换为真正的数组 使用众多的数组方法 更方便进行遍历

function m() {

	let a = [...arguments];

	return a;

}

let x = m(1,2,3); //Iterator 接口(数组,Set, Map) 不能转化类数组对象，但Array.from()行(有length就行)

let mark = Array.from({length: 2});







//扩展的数组方法

//Array.of()  用于将一组值，转换为数组 行为统一

Array() // []

Array(3) // [, , ,]

Array(3, 11, 8) // [3, 11, 8]

//copyWithin(target, start, end); 将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组

[1, 2, 3, 4, 5].copyWithin(0, 3, 4);



//fill(num);  用给定值，填充一个数组

['a', 'b', 'c'].fill(7)

//includes(target, start);

[1, 2, 3].includes(2);  





//箭头函数

var x = v => v - 1;


function x(v) {

	return v - 1;

}



var m = (x, y) => {

	let q = x * y;

	let p = x / y;

	return q / p;

}



var l = (x, y) => ({

	x: x,

	y: y

});

//this

var o = {

    x : 1,

    func : function() { console.log(this.x) },

    test : function() {

    	//var self = this;

        setTimeout(function() {

            this.func();//self.func();

        }, 100);

    }

};



var o = {

    x : 1,

    func : function() { console.log(this.x) },

    test : function() {

        setTimeout(() => { this.func() }, 100);

    }

};

var x = 1,

    o = {

        x : 10,

        test : () => this.x

    };



o.test(); // 1

o.test.call(o); // 依然是1



function a(...value) {

	console.log(value);

}



var x = (...value) => value;

