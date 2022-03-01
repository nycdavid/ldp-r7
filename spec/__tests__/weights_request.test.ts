import WeightsRequest from "../../app/javascript/weights_request";

describe("WeightsReqest", () => {
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

      const weights = await req.index();

      console.log(weights);
    });
  });
});
