import { useState } from "react";

const Comp1 = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </>
  );
};

export default Comp1;
