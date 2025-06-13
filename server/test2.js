function tspWithRevisit(dist) {
  const n = dist.length;
  const FULL = (1 << n) - 1;
  const memo = Array.from({ length: n }, () => Array(1 << n).fill(Infinity));

  memo[0][1] = 0; // 시작은 0번 도시, 방문 상태는 0001

  for (let visited = 1; visited <= FULL; visited++) {
    for (let u = 0; u < n; u++) {
      if (!(visited & (1 << u))) continue;
      for (let v = 0; v < n; v++) {
        // if(visited & (1 << v)) continue; // 재방문 불가 조건

        const nextVisited = visited | (1 << v); 
        // to debug
        // if(visited===11){// 1011->1111
        //   console.log('debug memo[2][FULL]:',u,v,memo[u][visited])
        //   if(u===1 && v===0) console.log(memo[1])
        //   // u==3 v==1 일때 memo[1] 업데이트
        // u는 3일때 memo[1]이 갱신되므로 u==1 v==2일때 갱신되지 않은 memo[1][visited]+dist[1][2] 사용되는 문제
        //   if(u===3 && v===2) console.log(memo[1])
        // }
        memo[v][nextVisited] = Math.min(
          memo[v][nextVisited],
          // memo[u][visited] + dist[u][v],
          memo[0][visited] + dist[0][v],
          memo[1][visited] + dist[1][v],
          memo[2][visited] + dist[2][v],
          memo[3][visited] + dist[3][v],
        );
      }
    }
  }


  // 0 -> last (모든 도시 방문)
  let minCost = Infinity;
  let last = -1;
  // for (let v = 0; v < n; v++) {
  //   minCost = Math.min(minCost, memo[v][FULL]);
  // }
  for (let v = 1; v < n; v++) {
    const cost = memo[v][FULL];
    if (cost < minCost) {
      minCost = cost;
      last = v;
    }
  }
  // 시작지점으로 되돌아가기
  // last -> 0은 0 -> last와 동일함
  // 전부 방문할 필요없음, memo[last] 값 중 가장 작은값 찾으면 됨
  const min= Math.min(...memo[last])
  console.log(last, min, minCost)
  console.log(memo[1])
  console.log(memo[2])
  console.log(memo[3])
  minCost += Math.min(...memo[last])

  return minCost;
}

const dist = [
  [       0,        1, 99999999, 70],
  [       1,        0,        1,        1],
  [99999999,        1,        0, Infinity],
  [70,        1, Infinity,        0]
];


console.log("최소 비용 (재방문 허용):", tspWithRevisit(dist));

// 외부루프 내부루프 순서만 뒤바뀌면 모든 u에 대한 하드코딩-> 루프로 일반화.
// for (let visited = 1; visited <= FULL; visited++) {
//   for (let v = 0; v < n; v++) {
//     for (let u = 0; u < n; u++) {
//       if (!(visited & (1 << u))) continue;

//       const nextVisited = visited | (1 << v);
//       memo[v][nextVisited] = Math.min(
//         memo[v][nextVisited],
//         memo[u][visited] + dist[u][v]
//       );
//     }
//   }
// }
