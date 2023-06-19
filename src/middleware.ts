import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  beforeAuth: function () {},
  publicRoutes: ["/"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
