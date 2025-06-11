
import { useState } from "react";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/ho2me";
import Comp1 from "./Comp1";
import { pool } from "~/db";

export function meta({params}: Route.MetaArgs) {
  console.log(params)
  console.log(params,'params??', process.env.DB_HOST)
  return [
    { title: "f Rof5512512512555futer App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Good = ()=>{
  return<h3>good</h3>
}

export default function Ho2me() {
  const [count, setCount] = useState(0);
  return <>
  <Good />
  <h1>f55ff={count}</h1> <button onClick={() => setCount(c => c + 1)}>+</button>
  <Comp1 />
  </>
}
