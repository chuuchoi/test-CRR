function buildFullMST(n, edges) {
  const parent = Array(n).fill(0).map((_, i) => i);

  function find(u) {
    if (parent[u] !== u) parent[u] = find(parent[u]);
    return parent[u];
  }

  function union(u, v) {
    const pu = find(u);
    const pv = find(v);
    if (pu === pv) return false;
    parent[pu] = pv;
    return true;
  }

  const mst = [];
  for (const [u, v] of edges) {
    if (union(u, v)) {
      mst.push([u, v]);
    }
  }
  return mst;
}

function extractDestMST(n, mstEdges, destinations) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of mstEdges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  // 목적지 간 union-find 구성
  const destParent = Array(n).fill(0).map((_, i) => i);
  function dFind(u) {
    if (destParent[u] !== u) destParent[u] = dFind(destParent[u]);
    return destParent[u];
  }
  function dUnion(u, v) {
    const pu = dFind(u);
    const pv = dFind(v);
    if (pu === pv) return false;
    destParent[pu] = pv;
    return true;
  }

  const result = [];
  const visited = Array(n).fill(false);
  function dfs(u, prev) {
    visited[u] = true;
    for (const v of graph[u]) {
      if (v === prev || visited[v]) continue;
      // 양 끝 중 하나라도 목적지면 포함
      if (dFind(u) !== dFind(v) && destSet.has(u) && destSet.has(v)) {
        result.push([u, v]);
        dUnion(u, v);
      }
      dfs(v, u);
    }
  }

  const destSet = new Set(destinations);
  dfs(destinations[0], -1);
  return result;
}


let N = 7;
let edges = [
  [1, 2],
  [4, 5],
  [3, 4],
  [0, 1],
  [3, 6],
  [1, 3],
];

const destinations = [0, 1, 2, 4];

const fullMST = buildFullMST(N, edges);
console.log(fullMST)
const result = extractDestMST(N, fullMST, destinations);
console.log("MST Edges for destinations:", result);
