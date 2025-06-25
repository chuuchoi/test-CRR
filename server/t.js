console.time()
let c=0
const LN = 100000000000
for(let i=0; i<LN; i++){
  c+=1
}
console.log(c)
console.timeEnd()