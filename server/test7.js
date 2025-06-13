function bfs(start, graph, n) {
  const dist = Array(n).fill(Infinity);
  const queue = [[start, 0]];
  dist[start] = 0;

  while (queue.length) {
    const [cur, d] = queue.shift();
    for (const next of graph[cur]) {
      if (dist[next] === Infinity) {
        dist[next] = d + 1;
        queue.push([next, d + 1]);
      }
    }
  }

  return dist;
}

function minDist(n, edges, destinations) {
  const k = destinations.length;
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  // 1. destinations 간 최단 거리 계산
  const cost = Array.from({ length: k }, () => Array(k).fill(0));
  for (let i = 0; i < k; i++) {
    const d = bfs(destinations[i], graph, n);
    for (let j = 0; j < k; j++) {
      cost[i][j] = d[destinations[j]];
    }
  }

  // 2. TSP (비트마스크 DP)
  const FULL = (1 << k);
  const dp = Array.from({ length: k }, () => Array(FULL).fill(Infinity));

  dp[0][1 << 0] = 0; // 시작점은 destinations[0]

  for (let visited = 0; visited < FULL; visited++) {
    for (let u = 0; u < k; u++) {
      if (!(visited & (1 << u))) continue;
      for (let v = 0; v < k; v++) {
        if (visited & (1 << v)) continue;
        const next = visited | (1 << v);
        dp[v][next] = Math.min(dp[v][next], dp[u][visited] + cost[u][v]);
      }
    }
  }

  let res = Infinity;
  for (let i = 0; i < k; i++) {
    res = Math.min(res, dp[i][FULL - 1]);
  }

  return res;
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

const destinations = [0, 1, 2, 3, 4, 5, 6];

console.log(minDist(n, edges, destinations)); // 최소 거리 출력
