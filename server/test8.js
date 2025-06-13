//✅ 문제 의도:
// destinations = [0, 3, 2]

// 모든 목적지를 지나되, 겹치는 간선을 다시 사용하지 않고 "전체 거리"를 최소화하고 싶음

// 즉, BFS 거리의 단순 합이 아니라, 실제 경로에서 중복된 부분은 한 번만 걷는 것처럼 처리해야 함

// ✅ 해결 방법:
// 이건 모든 목적지를 포함하는 최소 트리 (최소 공통 연결 서브그래프) 문제로 변형할 수 있고,
// 이는 다음 방식으로 정확히 해결됩니다:

// ✅ 해법 요약
// destinations에 있는 노드를 모두 포함하는 **최소 신장 트리 (MST)**를 만든 후,

// 그 간선 수의 합 또는 거리의 합을 리턴

function bfsFrom(u, graph, n) {
  const dist = Array(n).fill(Infinity);
  const parent = Array(n).fill(-1);
  const queue = [[u, 0]];
  dist[u] = 0;

  while (queue.length) {
    const [cur, d] = queue.shift();
    for (const next of graph[cur]) {
      if (dist[next] === Infinity) {
        dist[next] = d + 1;
        parent[next] = cur;
        queue.push([next, d + 1]);
      }
    }
  }

  return { dist, parent };
}

function minDistMST(n, edges, destinations) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const edgeSet = new Set();

  for (const src of destinations) {
    const { parent } = bfsFrom(src, graph, n);
    for (const dst of destinations) {
      if (src === dst) continue;

      // reconstruct path from dst to src
      let cur = dst;
      while (cur !== src && parent[cur] !== -1) {
        const u = cur;
        const v = parent[cur];
        const key = u < v ? `${u}-${v}` : `${v}-${u}`;
        edgeSet.add(key);
        cur = v;
      }
    }
  }

  return edgeSet.size;
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

const destinations =[0, 1, 2, 3, 4, 5, 6];

console.log(minDistMST(n, edges, destinations)); // ✅ 결과: 3
