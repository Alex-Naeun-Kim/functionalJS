

var users = [
  { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 32 },
  { id: 3, name: 'JM', age: 34 },
  { id: 4, name: 'PJ', age: 27 },
  { id: 5, name: 'HA', age: 25 },
  { id: 6, name: 'JE', age: 26 },
  { id: 7, name: 'JI', age: 31 },
  { id: 8, name: 'MP', age: 23 }
];


// 1. 30세 미만의 유저의 이름 목록

var under_30 = _filter(users, function(user) {
	return user.age < 30;
})

var ages = _map(under_30, function(user) {
	return user.age;
})

console.log(ages);

// 2. 30세 이상의 유저 id 목록

var over_30 = _filter(users, function(user) {
	return user.age > 30;
})

var ids = _map(over_30, function(user) {
	return user.id;
})

console.log(ids);

// 3. 30세 미만의 유저들의 나이의 총합

var sum_under_30 = _reduce(under_30, (sum, user) => sum + user.age, 0);

console.log(sum_under_30);

// 4. 이름이 PJ인 유저의 나이

var userPJ = _find(users, function(user){
	return user.name == 'PJ'
})

console.log(userPJ.age);

// 5. n빵 함수: curryr을 사용

function divide(a, b) {
	return a / b;
}
/*
var divided_by_8 = _curryr(divide)(8);

console.log(divided_by_8(16));
*/

console.log(_curryr(divide)(8)(16));
/*
_go(products, 
	products => _find(products, product => product.name == '후드티'),
	hoodie => {
		var price = hoodie.price;
		return _reduce(hoodie.sizes, (sum, size) => sum + (price + size.price) * size.quantity, 0);
	},
	console.log
)
*/


// 1. 30세 미만의 유저의 이름 목록
/*
//filter

var under30 = _filter(users, function(user){
	return user.age < 30;
})

console.log(under30);

//reduce

var userUnder30 = _reduce(users, function(grouped, user){
	var key = user.age < 30;
	grouped[key] ? grouped[key].push(user.name) : (grouped[key] = [user.name]);
	return grouped;
}, {});

console.log(userUnder30);

//go

var goUser30 = _go(users,
	_filter(user => user.age < 30),
	_map(names, (name))
);

console.log(goUser30);
*/