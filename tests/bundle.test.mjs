import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";

const lock = JSON.parse(readFileSync(new URL("../skills/itpay/bundle.lock.json", import.meta.url)));
const launcher = fileURLToPath(new URL("../skills/itpay/scripts/itpay.mjs", import.meta.url));

test("bundled CLI matches the locked version", () => {
  assert.equal(execFileSync(process.execPath, [launcher, "--version"], { encoding: "utf8" }).trim(), lock.version);
  assert.equal(lock.package, "@itpay/cli");
  assert.equal(lock.format, "single-file-esm");
  assert.match(lock.npmIntegrity, /^sha512-/);
  assert.equal(existsSync(new URL("../skills/itpay/vendor/itpay-cli/node_modules", import.meta.url)), false);
  assert.equal(existsSync(new URL("../skills/itpay/vendor/itpay-cli/package", import.meta.url)), false);
  assert.equal(existsSync(new URL("../skills/itpay/vendor/itpay-cli/docs/agent/buyer/quickstart.json", import.meta.url)), true);
  assert.equal(existsSync(new URL("../skills/itpay/vendor/itpay-cli/licenses/commander/LICENSE", import.meta.url)), true);
  assert.equal(existsSync(new URL("../skills/itpay/vendor/itpay-cli/licenses/qrcode/license", import.meta.url)), true);
});
