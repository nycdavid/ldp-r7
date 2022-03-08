import { Polly } from "@pollyjs/core";
import NodeHTTPAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";

Polly.register(NodeHTTPAdapter);
Polly.register(FSPersister);

import WeightsRequest from "../../app/javascript/weights/request";

describe("WeightsRequest", () => {
  let polly;

  beforeEach(() => {
    polly = new Polly("WeightsRequest#index", {
      adapters: ["node-http"],
      persister: "fs",
      logLevel: "error",
    });
  });

  afterEach(async () => {
    await polly.stop();
  });

  const routes = {
    index: "http://localhost:3000/weights",
  };

  describe("#constructor", () => {
    test("setting the routes attribute", () => {
      const req = new WeightsRequest(routes);

      expect(req.routes).toEqual(routes);
    });
  });

  describe("#index", () => {
    test("returns a Weights collection instance", async () => {
      const req = new WeightsRequest(routes);

      const weights = await req.index("david", 7);

      expect(weights._weights.length).toEqual(1)
    });
  });
});
