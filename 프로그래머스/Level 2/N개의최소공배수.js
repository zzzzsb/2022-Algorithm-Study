// N개의 최소공배수 

/*
수빈
유클리드 호제법 time: O(logN) -> N은 두 수중 큰 수
*/
function solution(arr) {
  let answer = arr[0];
  for(let i=1; i<arr.length; i++){
      let gcdNum = gcd(answer, arr[i]);
      let lcmNum = answer * arr[i] / gcdNum;
      answer = lcmNum;
  }
  return answer;
}

function gcd(a, b){
  if(a < b) {
      let temp = a;
      a = b;
      b = temp;
  }
  while(b!==0){
      let n = a%b;
      a=b;
      b=n;
  }
  return a;
}

// 홍빈
// 유클리드 호제법 : time O(max(a,b))
function solution(arr) {
  const getLCD = (a, b) => {
		const getGCD = (a, b) => {
			while (b) {
				let r = a % b;
				a = b;
				b = r;
			}
			return a;
		};

		return (a * b) / getGCD(a, b);
	};

	return arr.reduce((lcd, x) => getLCD(lcd, x), 1);
}