var products = [
  {
    is_selected: true, // <--- 장바구니에서 체크 박스 선택
    name: "반팔티",
    price: 10000, // <--- 기본 가격
    sizes: [ // <---- 장바구니에 담은 동일 상품의 사이즈 별 수량과 가격
      { name: "L", quantity: 2, price: 0 },
      { name: "XL", quantity: 3, price: 0 },
      { name: "2XL", quantity: 2, price: 2000 }, // <-- 옵션의 추가 가격
    ]
  },
  {
    is_selected: true,
    name: "후드티",
    price: 21000,
    sizes: [
      { name: "L", quantity: 3, price: -1000 },
      { name: "2XL", quantity: 1, price: 2000 },
    ]
  },
  {
    is_selected: false,
    name: "맨투맨",
    price: 16000,
    sizes: [
      { name: "L", quantity: 4, price: 0 }
    ]
  }
];


//map

var arr = [1,2,3,4];

function _map(list, func){
  
  var result = [];
  
  for(var i = 0; i < list.length; i++){
    result.push(func(list[i]));
  }
  
  return result;
}

//filter

function _filter(list, func){
  
  var result = [];
  
  for(var i = 0; i < list.length; i++){
    if(func(list[i]) == true){ //만약 함수의 array가 true라면,
      result.push(list[i]); //array의 해당 값을 result 에 넣어라
    }
  }
  
  return result;
}

function isOdd(value){
  return value%2;
}

var resultFilter = _filter(arr, isOdd);

console.log(resultFilter);


//reduce

function _reduce(list, func, init) {
  
  for(var i = 0; i < list.length; i++){ 
    init = func(init, list[i]);//함수를 한 번 돌고 나온 값을 초기값에 넣음.
  }
  return init;//초기값 리턴. 이걸 계속 반복하는 것.
}

//1. 모든 수량
// reduce로 먼저 products > size 배열의 수를 구한다. item
  // reduce로 그 수를 받아서 각 size의 quantity를 구한다. size
  // size 배열의 수 + size.quantity의 수를 반환한다.

var totalQty = function(products) {
  return _reduce(products, function(totalQty, product){
    return _reduce(product.sizes, function(totalQty, size) {
      return totalQty + size.quantity;
    }, totalQty);
  }, 0)
};

console.log(totalQty(products));

//2. 선택된 총수량
//filter로 이미 구해놓은 !!totalQty 안에서!! is_selected 의 값을 반환

var selectedTQ = totalQty(_filter(products, function(product) {
  return product.is_selected;
}))

console.log(selectedTQ);

//3. 모든 가격

var totalPrice = function(products) {
  return _reduce(products, function(totalPrice, product){
    return _reduce(product.sizes, function(totalPrice, size) {
      return (product.price + size.price) * size.quantity;
    }, totalPrice);
  }, 0);
};

console.log(totalPrice(products));

//4. 선택된 총가격

var selectedTP = totalPrice(_filter(products, function(product) {
  return product.is_selected;
}))

console.log(selectedTP);

