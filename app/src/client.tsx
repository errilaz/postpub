import React from "react"
import { After, ensureReady } from "@jaredpalmer/after"
import { ApiClient, WebTransport } from "poststack"
import { hydrate } from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { Api } from "./common"
import routes from "./common/routes"

const transport = new WebTransport("/api")
const api = ApiClient.create(Api, transport)
const services = { api }

createApp()

export async function createApp() {
  const data: any = await ensureReady(routes)
  hydrate(
    <BrowserRouter>
      <After data={data} routes={routes} transitionBehavior="blocking" {...services} />
    </BrowserRouter>,
    document.getElementById("root")
  )
}


if (module.hot) {
  module.hot.accept();
}
