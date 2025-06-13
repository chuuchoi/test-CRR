function maxProduct(words) {
  const n = words.length;
  const masks = new Array(n).fill(0);
  const lens = new Array(n);

  for (let i = 0; i < n; i++) {
    let mask = 0;
    for (const c of words[i]) {
      mask |= (1 << (c.charCodeAt(0) - 97));
    }
    masks[i] = mask;
    lens[i] = words[i].length;
  }

  let max = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if ((masks[i] & masks[j]) === 0) {
        max = Math.max(max, lens[i] * lens[j]);
      }
    }
  }
  return max;
}
console.log(maxProduct(['abcdefgfgs', 'abcdefgfgs','abc', 'klmn']))
