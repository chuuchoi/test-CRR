// auth-required/layout.tsx
import { Outlet } from "react-router";
import { redirect, type LoaderFunctionArgs } from "react-router";

// SSR용 loader
export function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("cookie");
  console.log(request)
  console.log('req method & URL :',request.method, request.url)
  const isLoggedIn = cookie?.includes("session=valid"); // 예시

  if (!isLoggedIn) {
    throw redirect("/login");
  }

  return null;
}

export default function AuthRequiredLayout() {
  return (
    <div>
      <h2>🛡️ 인증이 필요한 페이지</h2>
      <Outlet />
    </div>
  );
}
