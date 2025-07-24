import { type RouteConfig, route, index, layout, prefix, } from "@react-router/dev/routes";

export default [
  index("./home.tsx"),
  route("about", "./about.tsx"),
  route("h2", "./routes/ho2me.tsx"),

  layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("register", "./auth/register.tsx"),
  ]),
  
  // 👇 인증된 사용자 전용 레이아웃
  layout("./auth-required/layout.tsx", [
    route("dashboard", "./auth-required/dashboard.tsx"),
    route("settings", "./auth-required/settings.tsx"),
  ]),

  ...prefix("concerts", [
    index("./concerts/home.tsx"),
    route("d", "./concerts/d.tsx"),
    route(":city", "./concerts/city.tsx"),
    route("trending", "./concerts/trending.tsx"),
  ]),
  
  ...prefix("figma-test", [
    index("./figma-test/index.tsx"),
    route("1", "./figma-test/MobileLogin.tsx"),
    route("2", "./figma-test/Products.tsx"),
    // route("3", "./figma-test/Register.tsx"),
  ]),

  route("*", "not-found.tsx")
] satisfies RouteConfig;
