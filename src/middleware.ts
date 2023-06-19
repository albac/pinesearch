import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
// import { getLastPath } from "./helpers";

const publicRoutes = ["/", "/auth/sign-in", "/auth/sign-up", "/auth/sign-out"];
// const privateRoutes = ["/example-private"];

export default authMiddleware({
  // afterAuth(auth, req, evt) {
  //   const path = getLastPath(req.url);
  //   if (!publicRoutes.includes(path) && !privateRoutes.includes(path)) {
  //     return redirectToSignIn({ returnBackUrl: "http://localhost:3000/" });
  //     return notFound()
  //   }

  //   if (!auth.userId && !auth.isPublicRoute) {
  //     return redirectToSignIn({ returnBackUrl: req.url });
  //   }
  // },
  beforeAuth: function () {},
  publicRoutes: publicRoutes,
  ignoredRoutes: []
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
