function dfs(start, N, graph){
  // bfs: queue (FIFO)
  // dfs: stack or recursive function (LIFO)
  const visited = Array(N).fill(false)
  const dist = Array(N).fill(Infinity)

  function recur(cur, distance){
    visited[cur] = true
    dist[cur] = distance
   
    for(let next of graph[cur]){
      if(!visited[next]){
        recur(next, distance+1)
      }
    }
  }
  // recur(start)

  const stack = [[start, 0]]
  while(stack.length){
    const [cur, distance] = stack.pop()
    visited[cur] = true
    dist[cur] = distance
   
    for(let next of graph[cur]){
      if(!visited[next]){
        stack.push([next, distance+1])
      }
    }
  }

  return dist
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

const destinations =[0, 1, 2, 4];

function bfs(start, N, graph){
  const queue =[[start,0]]
  const visited = Array(N).fill(false)
  const dist = Array(N).fill(Infinity)
  visited[start] = true
  dist[start] = 0

  while(queue.length){
    const [cur, distance] = queue.shift()
    
    for(let next of graph[cur]){
      if(!visited[next]){
        visited[next] = true
        dist[next] = distance+1
        queue.push([next, distance+1])
      }
    }
  }

  return dist
}
function minSpanningTree(N, edges, destinations){
  const graph = Array.from({length:N},()=>[])
  const Trees = []
  for(let [u, v] of edges){
    graph[u].push(v)
    graph[v].push(u)
    if(graph[u].length>2) Trees.push(u)
    if(graph[v].length>2) Trees.push(v)
  }
console.log('TREES:',Trees, graph) //그래프는 트리 형태임을 전재로 함. 갈래길 목록

  let start = destinations[0]
  const visited = Array(N).fill(false)
  const traj = Array(N).fill(new Set()) //trajectory
  visited[start] = true
  const queue = [[start, traj]]
  while(queue.length){
    const [node, traj] = queue.shift()

    for(let next of graph[node]){
      let end = destinations[destinations.length-1]
      if(next < start || next > end) continue; // 탐색 최적화(시작과 끝 사이만 탐색). destinations가 오름차순 정렬이라고 가정
      if(!visited[next]){
        visited[next] = true
        let path = node>next?`${next}-${node}`:`${node}-${next}`
        traj[next] = new Set(traj[node])
        traj[next].add(path)
        queue.push([ next, traj ])
      }
    }
  }

  let unionSet = new Set()
  for(let i=1; i<destinations.length; i++){
    let d = destinations[i]
    console.log(`${start}->${d}:`,traj[d])
    unionSet = unionSet.union(traj[d])
  }

  return unionSet

  // const d = []
  // const cost  = Array.from({length:N},()=>[])
  // for(let i of destinations){
  //   d[i] = bfs(i, N, graph)
  //   for(let j of destinations){
  //     if(i !== j){
  //       cost[i][j] = d[i][j]
  //     }
  //   }
  // }
  // return cost
}

// minSpanningTree(N, edges, destinations)

const parent = Array(5).fill(0).map((_, i) => i);

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

console.log(parent)
union(0,1)
union(1,2)
console.log(
  find(0),
  find(1),
  find(2),
  find(3),
  find(4),
)
console.log(parent)
union(4, 0)
// console.log(
//   find(0),
//   find(1),
//   find(2),
//   find(3),
//   find(4),
// )
console.log(parent)
