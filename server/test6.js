function minDist(n, edges, a, b) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u); // 무방향 그래프
  }
  console.log(graph)
  
  const Trees = []
  const visited = Array(n).fill(false);
  const queue = [[a, 0]]; // [현재 노드, 거리]
  visited[a] = true;
  
  while (queue.length) {
    const [cur, dist] = queue.shift();
    if (cur === b) {
      console.log(Trees)
      return dist;
    }
    
    if( graph[cur].length===3 ) Trees.push(cur)
    for (const next of graph[cur]) {
      if (!visited[next]) {
        visited[next] = true;
        queue.push([next, dist + 1]);
      }
    }
  }

  return -1; // b에 도달 불가능
}
const n = 7;
const edges = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [4, 5],
  [3, 6],
];

console.log(minDist(n, edges, 0, 6)); // 결과: 4
// console.log(minDist(n, edges, 2, 6)); // 결과: 3