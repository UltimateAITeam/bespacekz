import { ServerClient } from "postmark";

const postmark = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);

export default postmark;
