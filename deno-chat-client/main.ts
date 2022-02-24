/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

// temporary workaround until URLPattern is defined
declare global {
  // deno-lint-ignore no-explicit-any no-var
  var URLPattern: any;
}

import { start } from "https://raw.githubusercontent.com/lucacasonato/fresh/main/server.ts";
import routes from "./routes.gen.ts";

await start(routes);
