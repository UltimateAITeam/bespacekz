export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/dashboard",
        "/firststeps",
        "/oauth_additional",
    ],

}