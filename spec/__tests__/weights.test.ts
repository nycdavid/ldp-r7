import Weights from "../../app/javascript/weights";

describe("Weights", () => {
  let measurements = [];

  beforeEach(() => {
    measurements = [
      { date: "2022/02/01", measurement: 201.6 },
    ]
  });

  describe("#constructor", () => {
    test("setting the measurements attribute", () => {
      const weights = new Weights(measurements);

      expect(weights.measurements[0]).toMatchObject(measurements[0]);
    });
  });

  describe("#decreasing", () => {
    test("returns true if the last weight is less than the first", () => {
      measurements.push({ date: "2022/02/02", measurement: 200 });

      const weights = new Weights(measurements);

      expect(weights.decreasing()).toBe(true);
    });

    test("returns false if the last weight is greater than the first", () => {
      measurements.push({ date: "2022/02/02", measurement: 205 });

      const weights = new Weights(measurements);

      expect(weights.decreasing()).toBe(false);
    });
  });
});
