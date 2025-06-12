//knapsack problem
let W = [5, 4, 3] //weight
let V = [8, 7, 2] //value
let capacity = 7
function maxVal(capacity, W, V){
  let memo = [0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0]
  // [0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 16, 16]
  // [0, 0, 0, 0, 7, 8, 8, 8, 8, 15]
  for(let i in W){
    for(let c=0; c<=capacity; c++){
      if(W[i] > c){
        // memo[c] = memo[c]
      }else{
        memo[c] =Math.max(memo[c], V[i] + memo[c-W[i]])
      }
    }
  }

  // let max = 0;
  // let rest_W = [...W]
  // let rest_V = [...V]
  // for(let i in W){
  //   rest_W.shift()
  //   rest_V.shift()
  //   if(W[i] > capacity){
  //     max = max
  //   }else{
  //     max = Math.max(
  //       V[i] + maxVal(capacity-W[i], rest_W, rest_V),
  //       maxVal(capacity, rest_W, rest_V)
  //     )
  //   }
  // }
  return memo
}
function knapsack(capacity, W, V) {
  let memo = Array(capacity + 1).fill(0);
  for (let c = capacity; c >= 0; c--) {
    for (let i in W) {
      if(c >= W[i])
        memo[c] = Math.max(memo[c], V[i] + memo[c - W[i]]);
    }
  }
  return memo;
}
function knapsack2(capacity, W, V) {
  const n = W.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  // DP 테이블 채우기
  for (let i = 1; i <= n; i++) {
    for (let c = 0; c <= capacity; c++) {
      if (W[i - 1] > c) {
        dp[i][c] = dp[i - 1][c];
      } else {
        dp[i][c] = Math.max(dp[i - 1][c], dp[i - 1][c - W[i - 1]] + V[i - 1]);
      }
    }
  }

  // 어떤 아이템이 포함됐는지 추적
  let c = capacity;
  const included = [];
  for (let i = n; i > 0; i--) {
    if (dp[i][c] !== dp[i - 1][c]) {
      included.push(i - 1); // i-1번째 아이템 포함
      c -= W[i - 1];
    }
  }

  return [dp[n][capacity], included.reverse()]; // value, 포함된 인덱스 (오름차순)
}

console.log('answer1:',knapsack(12, W, V))
console.log('answer2:',knapsack2(6, W, V))