// Copyright 2020 Luke Shay. All rights reserved. MIT license.

import { getVersion, runAndExitOnFail } from "./common.ts";

const version = await getVersion();

await runAndExitOnFail({ cmd: ["git", "fetch", "origin", "--tags"] });
await runAndExitOnFail({ cmd: ["git", "tag", version] });
await runAndExitOnFail({ cmd: ["git", "push", "--tags"] });