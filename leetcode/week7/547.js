/** union find ver.
 * @param {number[][]} isConnected
 * @return {number}
 union find
 디폴트 3에서 덩어리가 될수록 -1
 부모는 자기자신으로 디폴트 셋팅.
 최종부모가 다르면 둘 중에 인덱스가 작은쪽으로 합치고,최종부모 업데이트하고 정답-1
 
 time O(N^2 * N인데 경로압축해서 더 줄어듬?), space O(N)
 */
var findCircleNum = function (isConnected) {
	let ans = isConnected.length;
	const parent = [...Array(isConnected.length)].map((x, i) => i);

	// 경로 압축
	const findParent = (index) => {
		if (index === parent[index]) return index;
		return (parent[index] = findParent(parent[index]));
	};

	//isConnected 대각선 절반을 순회
	for (let i = 0; i < isConnected.length; i++) {
		for (let j = i + 1; j < isConnected[0].length; j++) {
			if (isConnected[i][j] === 0) continue;

			const p1 = findParent(i);
			const p2 = findParent(j);
			if (p1 === p2) continue;

			// 인덱스가 큰 쪽의 부모를 작은 인덱스의 부모로 교체하고 ans--;
			const p = Math.min(p1, p2);
			parent[p1] = p;
			parent[p2] = p;
			ans--;
		}
	}
	return ans;
};

/** dfs ver.
 * @param {number[][]} isConnected
 * @return {number}
 
 일단 0처리
 0-7연결이면 
 7처리하고
 7라인으로 재귀.
 
 dfs는 한번 방문했던 row로 또 들어가지 않는다.
 time O(N^2), space O(N) for visited array
 
 */
var findCircleNum = function (isConnected) {
	let ans = isConnected.length;
	const v = Array(isConnected.length).fill(0);

	const dfs = (index) => {
		v[index] = 1;

		for (let i = 0; i < isConnected[index].length; i++) {
			if (isConnected[index][i] && v[i] === 0) {
				ans--;
				dfs(i);
			}
		}
	};

	for (let i = 0; i < isConnected.length; i++) {
		if (v[i] === 0) dfs(i);
	}

	return ans;
};



/*
수빈

[i][j]=1 이면 i번째 도시랑 j번째 도시랑 연결되었다는 뜻.
0,0 1,1 2,2 ... 는 무조건 1
ex. 
0,1,2 방문여부 확인할 visited=[t,t,f]
f면 dfs확인해본다. 
-> 열 확인. 값이 1이면 dfs또함.

time: O(N^2)
space: O(N) for visited
*/
var findCircleNum = function(isConnected) {
	let result = 0;
	let visited = new Array(isConnected.length).fill(false);
	for(let i=0; i<isConnected.length; i++){
			if(!visited[i]){
					dfs(isConnected, i);
					result++;
			}
	}
	
	function dfs(isConnected, i){
			// 열 확인
			for(let j=0; j<isConnected[i].length; j++){
					// 1이고 j가 방문 안한 도시면
					if(isConnected[i][j]===1 && !visited[j]){
							visited[j]=true;
							dfs(isConnected, j);
					}
			}
	}
	
	return result;
};
