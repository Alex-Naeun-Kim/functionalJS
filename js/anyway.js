
"use strict"

//node 설정
const fs = require('fs');

//목적: 텍스트 파일에서 단어를 추출해서 가장 많이 나온 단어 top 10 을 뽑겠다.
//일단 텍스트 파일에서 데이터를 갖고 와야겠지 const content
//그리고 단어 단위로 쪼개겠지 const words
//쪼개진 데이터를 객체에 저장하고 const tally
//단어와 카운트로 나눠서 배열로 만듬 let tallyAsArray
//카운트 순서대로 sorting
//sorting된 데이터를 count 순서대로 1-10까지 담음 let top10
//랭킹과 함께 출력


//1. words.txt 에서 문자열로 갖고와서 담기
//2. 단어들을 단어 단위로 쪼개서 담기
//3. 갖고온 데이터를 저장할 빈 객체

//1.
const content = fs.readFileSync('words.txt').toString();
const words = content.split(/[\s.,\/:\n]+/);
const tally = {};

//[단어들을 for로 돌면서 수집]
//1. 단어들을 소문자로 변경해서 단어조각에 담기
//2. 해당 단어의 tally가 초기화되지 않았고
//정의되지 않은 경우에 1에서 0을 추가하려는 이 단어의 tally에 하나를 더하십시오.
for(let i = 0; i < words.length; i++) {
	let word = words[i].toLowerCase();
	tally[word] = (tally[word] || 0) + 1;
}


//top10을 찾을거임. tally 객체를 배열로 만들거임
//1.tallyAsArray라는 빈배열을 정의.
//2.[for in]로 돌면서 tally 안의 word를 찾음
////찾아서 tallyAsArray 에 push
//3.count 순서대로 sorting
//4.top10에 배열의 0-9까지 담기(1위~10위)

let tallyAsArray = [];

for(let word in tally) {
	tallyAsArray.push({ word: word, count: tally[word] });
}

tallyAsArray.sort(function(a, b) {
	return b.count - a.count;
})

let top10 = tallyAsArray.slice(0, 10);

for(let i = 0; i < top10.length; i++) {
	let rank = i + 1;
	let entry = top10[i];
	console.log(rank + '. ' + entry.word + ': ' + entry.count);
}

