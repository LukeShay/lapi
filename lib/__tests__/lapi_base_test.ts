import type { ServerRequest } from "../../deps.ts";
import { assertEquals, assert } from "../../deps_test.ts";
import { LapiBase, RequestMethod } from "../lapi_base.ts";
import { testName } from "./utils_test.ts";

Deno.test({
  name: testName(
    "LapiBase",
    "constructor",
    "default values",
  ),
  fn: () => {
    const lapiBase = new LapiBase();

    assertEquals(lapiBase.middlewares.length, 0);
    assertEquals(lapiBase.routes.length, 0);
  },
});

Deno.test({
  name: testName(
    "LapiBase",
    "addRoute",
    "adds route to routes array",
  ),
  fn: () => {
    const lapiBase = new LapiBase();

    lapiBase.addRoute(RequestMethod.POST, "/path", (_req: ServerRequest) => {});

    assertEquals(lapiBase.routes.length, 1);
  },
});

Deno.test({
  name: testName(
    "LapiBase",
    "addMiddleware",
    "adds route to middleware array",
  ),
  fn: () => {
    const lapiBase = new LapiBase();

    lapiBase.addMiddleware((_req: ServerRequest) => {});

    assertEquals(lapiBase.middlewares.length, 1);
  },
});

Deno.test({
  name: testName(
    "LapiBase",
    "post",
    "adds POST route to routes array",
  ),
  fn: () => {
    const lapiBase = new LapiBase();

    lapiBase.post("/path", (_req: ServerRequest) => {});

    assertEquals(lapiBase.routes.length, 1);
    assertEquals(lapiBase.routes[0].requestMethod, RequestMethod.POST);
  },
});

Deno.test({
  name: testName(
    "LapiBase",
    "get",
    "adds GET route to routes array",
  ),
  fn: () => {
    const lapiBase = new LapiBase();

    lapiBase.get("/path", (_req: ServerRequest) => {});

    assertEquals(lapiBase.routes.length, 1);
    assertEquals(lapiBase.routes[0].requestMethod, RequestMethod.GET);
  },
});

Deno.test({
  name: testName(
    "LapiBase",
    "put",
    "adds PUT route to routes array",
  ),
  fn: () => {
    const lapiBase = new LapiBase();

    lapiBase.put("/path", (_req: ServerRequest) => {});

    assertEquals(lapiBase.routes.length, 1);
    assertEquals(lapiBase.routes[0].requestMethod, RequestMethod.PUT);
  },
});

Deno.test({
  name: testName(
    "LapiBase",
    "delete",
    "adds DELETE route to routes array",
  ),
  fn: () => {
    const lapiBase = new LapiBase();

    lapiBase.delete("/path", (_req: ServerRequest) => {});

    assertEquals(lapiBase.routes.length, 1);
    assertEquals(lapiBase.routes[0].requestMethod, RequestMethod.DELETE);
  },
});

Deno.test({
  name: testName(
    "LapiBase",
    "options",
    "adds OPTIONS route to routes array",
  ),
  fn: () => {
    const lapiBase = new LapiBase();

    lapiBase.options("/path", (_req: ServerRequest) => {});

    assertEquals(lapiBase.routes.length, 1);
    assertEquals(lapiBase.routes[0].requestMethod, RequestMethod.OPTIONS);
  },
});

Deno.test({
  name: testName(
    "LapiBase",
    "head",
    "adds HEAD route to routes array",
  ),
  fn: () => {
    const lapiBase = new LapiBase();

    lapiBase.head("/path", (_req: ServerRequest) => {});

    assertEquals(lapiBase.routes.length, 1);
    assertEquals(lapiBase.routes[0].requestMethod, RequestMethod.HEAD);
  },
});

Deno.test({
  name: testName(
    "LapiBase",
    "patch",
    "adds PATCH route to routes array",
  ),
  fn: () => {
    const lapiBase = new LapiBase();

    lapiBase.patch("/path", (_req: ServerRequest) => {});

    assertEquals(lapiBase.routes.length, 1);
    assertEquals(lapiBase.routes[0].requestMethod, RequestMethod.PATCH);
  },
});

Deno.test({
  name: testName(
    "LapiBase",
    "findRoute",
    "finds correct route",
  ),
  fn: () => {
    const lapiBase = new LapiBase();

    lapiBase.patch("/path", (_req: ServerRequest) => {});
    lapiBase.post("/path", (_req: ServerRequest) => {});
    lapiBase.get("/path", (_req: ServerRequest) => {});
    lapiBase.post("/path2", (_req: ServerRequest) => {});

    const route = lapiBase.findRoute(
      { method: RequestMethod.POST, url: "/path" } as unknown as ServerRequest,
    );

    assert(route);
    assertEquals(route.requestMethod, RequestMethod.POST);
    assertEquals(route.requestPath, "/path");
  },
});

Deno.test({
  name: testName(
    "LapiBase",
    "findRoute",
    "doesn't find route",
  ),
  fn: () => {
    const lapiBase = new LapiBase();

    lapiBase.patch("/path", (_req: ServerRequest) => {});
    lapiBase.post("/path", (_req: ServerRequest) => {});
    lapiBase.get("/path", (_req: ServerRequest) => {});
    lapiBase.post("/path2", (_req: ServerRequest) => {});

    const route = lapiBase.findRoute(
      {
        method: RequestMethod.DELETE,
        url: "/path",
      } as unknown as ServerRequest,
    );

    assert(!route);
  },
});
