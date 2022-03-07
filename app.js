import { Application, Session } from "./deps.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { userMiddleware } from "./middlewares/userMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application();
const session = new Session();
app.use(session.initMiddleware());

app.use(errorMiddleware);
app.use(authMiddleware);
app.use(renderMiddleware);
app.use(userMiddleware);
app.use(router.routes());

let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

app.listen({ port: port });

export { app }