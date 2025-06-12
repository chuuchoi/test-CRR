function tspWithPath(dist) {
  const n = dist.length;
  const INF = Infinity;

  // memo[c][visited] = 최소비용
  const memo = Array.from({ length: n }, () => Array(1 << n).fill(INF));
  const path = Array.from({ length: n }, () => Array(1 << n).fill(-1)); // 경로 추적용

  memo[0][1] = 0; // 시작: 도시 0만 방문

  // DP 채우기
  for (let visited = 1; visited < (1 << n); visited++) {
    for (let u = 0; u < n; u++) {
      if (!(visited & (1 << u))) continue; // u는 현재 방문한 도시 중 하나여야 함

      for (let v = 0; v < n; v++) {
        if (visited & (1 << v)) continue; // v는 아직 방문하지 않은 도시여야 함

        const nextVisited = visited | (1 << v);
        const newCost = memo[u][visited] + dist[u][v];
        if (newCost < memo[v][nextVisited]) {
          memo[v][nextVisited] = newCost;
          path[v][nextVisited] = u; // v 이전엔 u에서 왔다
        }
      }
    }
  }

  // 최종 방문 상태 (모든 도시 방문)
  const FULL = (1 << n) - 1;
  let minCost = INF;
  let last = -1;

  // 마지막 도시 v → 0으로 돌아오는 비용 포함해서 최종 비용 계산
  for (let v = 1; v < n; v++) {
    const cost = memo[v][FULL] + dist[v][0];
    if (cost < minCost) {
      minCost = cost;
      last = v;
    }
  }

// 경로 추적
const route = [];
let visited = FULL;
route.push(0); // 시작점
let curr = last;

while (curr !== 0) {
  route.push(curr);
  const prev = path[curr][visited];
  visited = visited ^ (1 << curr);
  curr = prev;
}
route.push(0); // 다시 시작점으로 복귀

route.reverse(); // 필요 없음: 위 순서대로면 이미 시작→끝 순


  // 단계별 memo 출력 (옵션)
  console.log("\n📋 단계별 memo 테이블 (요약):");
  for (let v = 0; v < n; v++) {
    console.log(`도시 ${v}:`, memo[v].map(c => (c === INF ? "INF" : c)));
  }

  return { minCost, route };
}
const dist = [
  [0, 10, 15, 20],
  [10, 0, 35, 25],
  [15, 35, 0, 30],
  [20, 25, 30, 0]
];

const result = tspWithPath(dist);
console.log("✅ 최소 비용:", result.minCost);
console.log("🛣️ 최단 경로:", result.route.join(" → "));
