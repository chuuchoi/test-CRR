import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/home";
import { pool } from "./db";
import { Welcome } from "./welcome/welcome";
import { Hi } from "./welcome/hi";
import { Example } from "./welcome/window";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "f Roffuter App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ }: LoaderFunctionArgs){
  try {
    const [rooms] = await pool.execute('SELECT * FROM rooms');
    return rooms;
  } catch (error:any) {
    return 'Error';
  }
}

export default function Home({loaderData}:Route.ComponentProps) {
  console.log('ASGASGSG???',import.meta.env.VITE_API_BASE_URL)
  return <>
  <Welcome />
  {'hi'}
  {JSON.stringify(loaderData)}
  <Hi />
  <Example />
  </>;
}
