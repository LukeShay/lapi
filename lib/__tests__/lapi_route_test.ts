// Copyright 2020 Luke Shay. All rights reserved. MIT license.

import { assert, assertEquals } from "../../deps_test.ts";
import { LapiRoute, RequestMethod } from "../lapi_route.ts";
import { testName } from "./test_utils.ts";
import { ServerRequest } from "../../deps.ts";

Deno.test({
  name: testName("LapiRoute", "constructor", "parses regex"),
  fn: () => {
    const lapiRoute = new LapiRoute(
      RequestMethod.POST,
      "/<paramOne>/yes/<param2Two>",
      () => {},
    );

    assertEquals(
      lapiRoute.requestPathRegex.exec("/p1/yes/p2")?.groups,
      { paramOne: "p1", param2Two: "p2" },
    );
  },
});

Deno.test({
  name: testName("LapiRoute", "FromRoute", "constructs"),
  fn: () => {
    const lapiRoute = LapiRoute.FromRoute({
      requestMethod: RequestMethod.POST,
      requestPath: "/<paramOne>/yes/<param2Two>",
      requestHandler: () => {},
    });

    assertEquals(
      lapiRoute.requestPathRegex.exec("/p1/yes/p2")?.groups,
      { paramOne: "p1", param2Two: "p2" },
    );
    assertEquals(lapiRoute.requestMethod, RequestMethod.POST);
  },
});

Deno.test({
  name: testName("LapiRoute", "matches", "true"),
  fn: () => {
    const lapiRoute = LapiRoute.FromRoute({
      requestMethod: RequestMethod.POST,
      requestPath: "/<paramOne>/yes/<param2Two>",
      requestHandler: () => {},
    });

    assertEquals(
      lapiRoute.requestPathRegex.exec("/p1/yes/p2")?.groups,
      { paramOne: "p1", param2Two: "p2" },
    );
    assert(
      lapiRoute.matches(
        { method: "POST", url: "/p1/yes/p2" } as unknown as ServerRequest,
      ),
    );
  },
});

Deno.test({
  name: testName("LapiRoute", "matches", "/ /path"),
  fn: () => {
    const lapiRoute = LapiRoute.FromRoute({
      requestMethod: RequestMethod.POST,
      requestPath: "/",
      requestHandler: () => {},
    });

    console.log(lapiRoute.requestPathRegex);

    assert(!lapiRoute.requestPathRegex.test("/path"));

    assert(
      !lapiRoute.matches(
        { method: "POST", url: "/path" } as unknown as ServerRequest,
      ),
    );
  },
});

Deno.test({
  name: testName("LapiRoute", "matches", "false"),
  fn: () => {
    const lapiRoute = LapiRoute.FromRoute({
      requestMethod: RequestMethod.POST,
      requestPath: "/<paramOne>/yes/<param2Two>",
      requestHandler: () => {},
    });

    assertEquals(
      lapiRoute.requestPathRegex.exec("/p1/yes/p2")?.groups,
      { paramOne: "p1", param2Two: "p2" },
    );
    assert(
      !lapiRoute.matches(
        { method: "GET", url: "/p1/yes/p2" } as unknown as ServerRequest,
      ),
    );
  },
});
