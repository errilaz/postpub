import { AfterRenderAppOptions, AfterpartyProps } from "@jaredpalmer/after";
import { ApiClient } from "poststack";
import { Api } from "./common/api";

declare module "@jaredpalmer/after" {
  export declare const After: import("react").ComponentClass<Pick<AfterpartyProps, "data" | "routes" | "transitionBehavior"> & { api: ApiClient<Api> }, any> & import("react-router").WithRouterStatics<typeof Afterparty>;
  export declare const render: <T extends unknown>(params: { api: ApiClient<Api> } & Pick<Pick<AfterRenderAppOptions<T>, "req" | "res" | "assets" | "routes" | "document" | "chunks" | "scrollToTop" | "customRenderer">, "req" | "res" | "assets" | "routes" | "document" | "chunks" | "scrollToTop" | "customRenderer">) => Promise<string>;
}
