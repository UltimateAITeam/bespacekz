export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/dashboard",
        "/firststeps",
        "/moreinfo",
        "/profile",
        '/vacancies/my'
    ],

}