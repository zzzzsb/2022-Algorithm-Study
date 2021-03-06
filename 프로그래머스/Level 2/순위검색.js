/*
사람하나 - 조건하나 이렇게 일일이 매칭하면 안됨. 최대 5만*10만...100억쓰

사람하나에 대해 각 4개조건
4개조건을 -인 모든 경우의수를 구한다? -> 한명당 16개, 16*5만 = ㄱㅊ

이렇게 맵에 키로 넣고 점수를 [value]
조건돌면서 조건 키에 맞는 놈이 있는지 맵에서 찾고, value점수까지 적절하면 정답에 해당되는 점수갯수 더하기
*/
function solution(info, query) {
	const infos = info.map((str) => str.split(" "));
	const qs = query.map((str) => str.replace(/\sand\s/g, " ").split(" "));
	const ans = Array(qs.length).fill(0);
	const map = new Map();

	for (let i of infos) {
		getComb(i, map);
	}

	for (let [key, v] of map) {
		map.get(key).sort((a, b) => a - b);
	}

	for (let i = 0; i < qs.length; i++) {
		const q = qs[i];
		const k = q.slice(0, q.length - 1).join("");
		const standard = parseInt(q[q.length - 1]);

		if (!map.has(k)) continue;

		// 위에 반복문으로 따로 안빼고 여기서 정렬하면 효율성 0점임 ;;;;;;; 머냐
		// const scores = map.get(k).sort((a, b) => a - b);
		const scores = map.get(k);

		let l = 0;
		let r = scores.length - 1;
		while (l <= r) {
			const m = Math.floor((l + r) / 2);
			if (scores[m] < standard) l = m + 1;
			else r = m - 1;
		}
		ans[i] += scores.length - l;
	}
	return ans;
}

function getComb(i, map) {
	const s = parseInt(i[i.length - 1]);

	const dfs = (curStr, depth) => {
		if (depth === i.length - 1) {
			if (!map.has(curStr)) map.set(curStr, [s]);
			else map.get(curStr).push(s);
			return;
		}

		dfs(curStr + i[depth], depth + 1);
		dfs(curStr + "-", depth + 1);
	};

	dfs("", 0);
}


/*
수빈
*/
function solution(info, query) {
  var answer = [];
  const infoMap = {};
  
  //info별 모든 조합 구하는 함수
  function combination(arr, score, start){
      const key = arr.join("");
      const value = infoMap[key];
      
      if(value) {
          infoMap[key].push(score);
      } else {
          infoMap[key] = [score];
      }
      
      for(let i=start; i<arr.length; i++){
          const temp = [...arr];
          temp[i]="-";
          combination(temp, score, i+1);
      }
  }
  
  for(const i of info){
      const splited = i.split(" ");
      const score = Number(splited.pop());
      combination(splited, score, 0);
  }
  
  //이진 탐색을 위한 배열 정렬
  for(const key in infoMap){
      infoMap[key] = infoMap[key].sort((a,b)=>a-b);
  }
  
  //query 순회하며 이진탐색
  for(const q of query){
      const splited = q.replace(/ and /g, " ").split(" ");
      const score = Number(splited.pop());
      const key = splited.join("");
      const arr = infoMap[key];
      
      if(arr){
          let start = 0;
          let end = arr.length;
          while(start < end) {
              const mid = Math.floor((start+end)/2);
              
              if(arr[mid]>=score){
                  end = mid;
              } else if(arr[mid]<score){
                  start = mid + 1;
              }
          }
          const result = arr.length - start;
          answer.push(result);
      } 
      else {
          answer.push(0);
      }
  }
  //console.log(infoMap)
  return answer;
}