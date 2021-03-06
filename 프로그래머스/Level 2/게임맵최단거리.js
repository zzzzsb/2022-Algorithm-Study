/*
[[1,0,1,1,1]
,[1,0,1,0,1]
,[1,0,1,1,1]
,[1,1,1,0,1]
,[0,0,0,0,1]]

bfs
동서남북 보면서 dist를 추가하며 큐에 넣는다.
[n-1][m-1]에 도착하면 정답을 dist로 갱신한다.
큐에서 뺄때 정답보다 큰 값이면 continue;

효율성.... => 방문체크를 큐에 넣기전에 하면 통과됨.......
*/
function solution(maps) {
	const n = maps.length;
	const m = maps[0].length;
	const q = [[0, 0, 1]];
	const move = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1],
	];
	let ans = n * m;

	while (q.length) {
		const [i, j, dist] = q.shift();

		if (i === n - 1 && j === m - 1) {
			ans = Math.min(ans, dist);
			break;
		}

		for (let [r, c] of move) {
			const newI = i + r;
			const newJ = j + c;

			if (newI < 0 || newJ < 0 || newI >= n || newJ >= m || maps[newI][newJ] !== 1) continue;

			maps[newI][newJ] = -1;
			if (dist + 1 <= ans) q.push([newI, newJ, dist + 1]);
		}
	}
	// console.log(maps);

	if (maps[n - 1][m - 1] === -1) return ans;
	return -1;
}


/*
수빈
*/
function solution(maps) {
  let answer = -1;
  let dy = [-1,0,1,0];
  let dx = [0,1,0,-1];

  const queue = [[0,0,1]];
  while(queue.length){
      let [y, x, cnt] = queue.shift();
      if (y === maps.length-1 && x === maps[0].length-1){
          answer = cnt;
          break;
      }
      for(let i = 0; i < 4;i++){
          let my = y + dy[i];
          let mx = x + dx[i];

          if (my < 0 || mx < 0 || my>=maps.length || mx>=maps[0].length){
              continue;
          }
          
          if(maps[my][mx]===1){
              maps[my][mx] = 0;
              queue.push([my,mx,cnt+1]);   
          }
      }
  }
  return answer;
}