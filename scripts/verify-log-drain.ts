import assert from "node:assert/strict";
import { parseEntries, toRecord } from "../api/log-drain";

const proxyRecord = toRecord({
  source: "static",
  projectId: "prj_velora",
  deploymentId: "dpl_production",
  requestId: "req_homepage",
  timestamp: "2026-08-17T20:00:00.000Z",
  proxy: {
    timestamp: "2026-08-17T20:00:00.000Z",
    host: "WWW.GestionVelora.com:443",
    path: "/",
    clientIp: "57.141.3.18",
    userAgent: ["facebookexternalhit/1.1"],
    statusCode: 200,
  },
});

assert.deepEqual(proxyRecord, {
  ip: "57.141.3.18",
  ua: "facebookexternalhit/1.1",
  path: "/",
  ts: "2026-08-17T20:00:00.000Z",
  status: 200,
  source: "static",
  hostname: "www.gestionvelora.com",
  projectId: "prj_velora",
  deploymentId: "dpl_production",
  requestId: "req_homepage",
});

const fallbackPayload = {
  ip: "57.141.0.48",
  ua: "meta-externalagent/1.1",
  path: "/services/location",
  hostname: "gestionvelora.com",
  ts: "2026-08-17T20:01:00.000Z",
};
const fallbackRecord = toRecord({
  source: "edge-function",
  projectId: "prj_velora",
  deploymentId: "dpl_production",
  requestId: "req_service",
  message: `CRAWLER ${JSON.stringify(fallbackPayload)}`,
});

assert.equal(fallbackRecord?.hostname, "gestionvelora.com");
assert.equal(fallbackRecord?.projectId, "prj_velora");
assert.equal(fallbackRecord?.deploymentId, "dpl_production");
assert.equal(fallbackRecord?.requestId, "req_service");
assert.equal(fallbackRecord?.path, "/services/location");

assert.equal(
  toRecord({
    proxy: {
      host: "www.gestionvelora.com",
      path: "/api/log-drain",
      userAgent: ["facebookexternalhit/1.1"],
    },
  }),
  null,
);

const ndjson = [
  JSON.stringify({ proxy: { path: "/", userAgent: ["facebookexternalhit/1.1"] } }),
  JSON.stringify({ proxy: { path: "/robots.txt", userAgent: ["meta-webindexer/1.1"] } }),
].join("\n");
assert.equal(parseEntries(ndjson).length, 2);

console.log("Crawler log-drain identity retention checks passed.");
