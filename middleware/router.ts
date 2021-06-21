// Copyright 2020 Luke Shay. All rights reserved. MIT license.
/* @module lapi/middleware/router */

import { ComposedMiddleware, Middleware, compose } from "../middleware.ts";
import { Context } from "../context.ts";

export type Method = "POST" | "GET" | "DELETE" | "PUT" | "OPTIONS";

function route(method: Method, path: string, middleware: ComposedMiddleware) {
  return async function (ctx: Context, next: () => Promise<void>) {
    if (ctx.request.method === method && ctx.request.url.pathname === path) {
      await middleware(ctx);
    }

    await next();
  };
}

/**
 * Used to handle routing and route specific middleware for a Lapi Application.
 */
export class Router {
  #basePath: string;
  #middleware: Middleware[] = [];
  #composedMiddleware?: ComposedMiddleware;

  constructor(basePath?: string) {
    this.#basePath = basePath ?? "/";
  }

  /* Adds Middleware or a route to the router. */
  use(
    middleware1: Middleware,
    middleware2: Middleware,
    ...middlewares: Middleware[]
  ): Router;
  use(method: Method, path: string, ...middlewares: Middleware[]): Router;
  use(
    methodOrMiddleware: Method | Middleware,
    pathOrMiddleware: string | Middleware,
    ...middlewares: Middleware[]
  ): Router {
    if (typeof methodOrMiddleware === "function") {
      this.#middleware.push(methodOrMiddleware);
      this.#middleware.push(pathOrMiddleware as Middleware);
      this.#middleware.push(...middlewares);
    } else {
      this.#middleware.push(
        route(
          methodOrMiddleware,
          (this.#basePath + pathOrMiddleware).replaceAll(/\/+/g, "/"),
          compose(middlewares)
        )
      );
    }

    return this;
  }

  /** Returns the routes and Middleware for the Lapi Application to use. */
  routes() {
    if (!this.#composedMiddleware) {
      this.#composedMiddleware = compose(this.#middleware);
    }

    return this.#composedMiddleware;
  }
}