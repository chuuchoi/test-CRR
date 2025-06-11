import { Outlet } from "react-router";

// auth/layout.tsx
export default function LayoutNameCanBeAnyThing() {
  console.log('auth layout active')
  return (
    <div>
      <h2>Auth Layout</h2>
      <Outlet />
    </div>
  );
}