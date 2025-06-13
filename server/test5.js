

function maxIndependentSet(n, edges) {
  const adj = Array(n).fill(0);

  for (const [u, v] of edges) {
    adj[u] |= (1 << v); //[0]=0010  [1]=0101 [2]=1010 [3]=0100
    adj[v] |= (1 << u); 
  }
  // console.log(adj.map(d=>d.toString(2).padStart(n,'0')))

  let maxSize = 0;
  let maxSets=[];
  for (let mask = 0; mask < (1 << n); mask++) {
    let ok = true;
    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) && (adj[i] & mask)) {
        ok = false;
        break;
      }
    }
    if (ok){
      let newSize = countBits(mask)
      if(maxSize === newSize) maxSets.push( mask.toString(2).padStart(n,'0') )
      if(maxSize < newSize){
        maxSize = newSize
        maxSets=[]
        maxSets.push( mask.toString(2).padStart(n,'0') )
      }
    }
  }
  console.log(maxSets)
  return maxSize;
}

function countBits(x) {
  return x.toString(2).split('1').length - 1;
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
// 001011
// 001001
console.log(maxIndependentSet(n, edges))