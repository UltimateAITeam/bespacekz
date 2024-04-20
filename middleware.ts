import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized(params) {
      console.log(params.req.nextUrl.pathname)
      if (params.req.nextUrl.pathname.startsWith("/candidates")) {
        if (params.token?.client?.isSubscribed) {
          return true;
        }
        else {
          return false;
        }
      }

      return true;
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
