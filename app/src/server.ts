import pg from "pg-promise"
import Koa from "koa"
import KoaRouter from "koa-router"
import koaStatic from "koa-static"
import { Assets, render } from "@jaredpalmer/after"
import { ApiClient, apiMiddleware, DbTransport } from "poststack"
import { env } from "./common/env"
import routes from "./common/routes"
import Api from "./common/api"

const assets: Assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
const db = createDb()
const transport = new DbTransport(db, pg.as)

const server = new Koa();
server.use(koaStatic(process.env.RAZZLE_PUBLIC_DIR!));

const router = new KoaRouter()
router.use("/api", prefixed("/api"), apiMiddleware(transport))
router.get("(.*)", serveApp)
server.use(router.routes())

export default server;

async function serveApp(context: Koa.Context) {
  try {
    // express compat
    (context.res as any).status = (status: number) => { context.status = status }
    const req = context.req as any
    const res = context.res as any
    const sessionToken = context.cookies.get("session_token" || null);
    const api = ApiClient.create(Api, transport);
    const html = await render({ req, res, routes, assets, chunks: {}, api });
    context.body = html;
  }
  catch ({ message, stack }) {
    console.log(message, stack);
    context.body = JSON.stringify({ message, stack });
  }
}

function createDb() {
  return pg()({
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT, 10),
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
  })
}

function prefixed(prefix: string) {
  return async function prefixMiddleware(context: Koa.Context, next: Koa.Next) {
    context.url = context.url.substring(prefix.length)
    await next()
  }
}