import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized(params) {
      if (params.req.nextUrl.pathname.startsWith("/candidates")) {
        if (params.token?.client?.isSubscribed) {
          return true;
        }
      }

      return false;
    },
  },
});

export const config = {
  matcher: [
    "/dashboard",
    "/firststeps",
    "/moreinfo",
    "/profile",
    "/candidates",
  ],
};
