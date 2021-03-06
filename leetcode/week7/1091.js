/**
 * @param {number[][]} grid
 * @return {number}
 [0][0]=1이면 -1
 [n-1][n-1]=1이면 -1
 
 최단거리 bfs
 
 대각선먼저 큐에넣고 동서남북 큐에넣고
 넣을 떄 [r,c,path]
 정답이 나오면 그게 최단거리. 바로 return.
 
 **visited처리 빼먹지말기**
 **정답찾는로직 정확히 정의하기**
 ** 하나만 덜렁 있을때는 큐에서 빼고나서 바로 정답로직을 처리해주어야히기 때문에, 예외로 처리하고
    정답로직은 큐에 넣기전에 해주는게 효율적이다. **
 */
    var shortestPathBinaryMatrix = function(grid) {
      if(grid[0][0]===1 || grid[grid.length-1][grid.length-1]===1) return -1;
      if(grid.length===1 && grid[0].length===1) return grid[0][0]===0 ? 1 : -1;
      
      const move=[[-1,-1],[-1,1],[1,-1],[1,1],[1,0],[-1,0],[0,1],[0,-1]];
      const q=[[0,0,1]];
      grid[0][0]=-1;
      
      while(q.length){
          const [r,c,path]=q.shift();
          
          for(let m of move){
              const R = r+m[0];
              const C = c+m[1];
              
              if(R<0 || C<0 || R>=grid.length || C>=grid[0].length || grid[R][C]!==0) continue;
              if(R===grid.length-1 && C===grid[0].length-1) return path+1;
              
              grid[R][C]=-1;
              q.push([R,C,path+1]);
          }
      }
      
      return -1;
  };


/*
수빈

아래로 대각선 가는게 제일 clear한 Path.

0을 만나면 [i,j]를 queue에 넣음 bfs..
확인한 애는 1로 바꿔줌.
마지막점 도달하면 return.
 
time: O(N^2)
space: O(N) for queue
 */
var shortestPathBinaryMatrix = function(grid) {
    //edge case
    if(grid[0][0]===1) return -1;
    
    let path = 1;
    const queue = [[0,0]];
    grid[0][0]=1;
    const dir = [[-1,0],[0,1],[1,0],[0,-1],[-1,1],[-1,-1],[1,1],[1,-1]];
    
    while(queue.length){
        const q_len = queue.length;
        for(let i=0; i<q_len; i++){
            const [x, y] = queue.shift();
            if(x===grid.length-1 && y===grid[0].length-1) return path;
            for(let [dx, dy] of dir){
                let newX = x + dx;
                let newY = y + dy;
                if(newX<0 || newY<0 || newX>=grid.length || newY>=grid[0].length || grid[newX][newY]===1) continue;
                else if(grid[newX][newY]===0){
                    queue.push([newX, newY]);
                    grid[newX][newY]=1;
                }
            }
        }
        path++;
    }
    return -1;
};