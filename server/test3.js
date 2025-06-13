// let includes= Array(4).fill(0)
// function printSubset(k){
//   if(k === 4){
//     let subset = []
//     console.log(includes)
//     for(let i = 0; i < 4 ; i++){
//       if(includes[i]) subset.push(i)
//     }
//     // console.log(subset)

//     return
//   }

//   includes[k]=true
//   printSubset(k+1)
  
//   includes[k]=k===3?'hi':false
//   printSubset(k+1)
// }
// printSubset(0)

function foo(n){
  let subsets = []
  for(let bitmask = 0; bitmask < (1 << n); bitmask++){
    let subset = []
    for(let i = 0; i < n; i++){
      if(bitmask & (1 << i)) subset[i] = i
      else subset[i] = false
    }
    subsets.push(subset)
  }
  console.log(subsets)
}
foo(4)


function countSubsetsSumK(n, k) {
  let count = 0;
  for (let bitmask = 0; bitmask < (1 << n); bitmask++) {
    let sum = 0;
    let b = bitmask;
    let i = 0;
    //bitmask에서 켜진 비트의 인덱스만 순회하는 방법으로 속도를 더 개선
    while (b > 0) {
      if (b & 1) sum += i;
      b >>= 1;
      i++;
    }
    if (sum === k) count++;
  }
  return count;
}