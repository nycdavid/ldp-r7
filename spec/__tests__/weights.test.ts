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

      expect(weights.decreasing()).toEqual(true);
    });

    test("returns false if the last weight is greater than the first", () => {
      measurements.push({ date: "2022/02/02", measurement: 205 });

      const weights = new Weights(measurements);

      expect(weights.decreasing()).toEqual(false);
    });
  });

  describe("#pctChange", () => {
    test("returns the percentage change between first and last weight", () => {
      measurements.push({ date: "2022/02/02", measurement: 205 });

      const weights = new Weights(measurements);

      expect(weights.pctChange()).toEqual("1.69%");
    });
  });

  describe("#currentValue", () => {
    test("returns the latest measurement", () => {
      measurements.push({ date: "2022/02/02", measurement: 205 });

      const weights = new Weights(measurements);

      expect(weights.currentValue()).toEqual(205);
    });
  });

  describe("#netChange", () => {
    test("returns the difference between the first and current values", () => {
      measurements.push({ date: "2022/02/02", measurement: 205 });

      const weights = new Weights(measurements);

      expect(weights.netChange()).toEqual("3.4");
    });

    test("returns a negative number when the change is a decrease", () => {
      measurements.push({ date: "2022/02/02", measurement: 190 });

      const weights = new Weights(measurements);

      expect(weights.netChange()).toEqual("-11.6");
    })
  });

  describe("#dates", () => {
    test("returns an array of date strings", () => {
      measurements.push({ date: "2022/02/02", measurement: 190 });

      const weights = new Weights(measurements);

      expect(weights.dates()).toEqual(["2022/02/01", "2022/02/02"]);
    });
  });

  describe("#weights", () => {
    test("returns an array of weight measurements", () => {
      measurements.push({ date: "2022/02/02", measurement: 190 });

      const weightsColl = new Weights(measurements);

      expect(weightsColl.weights()).toEqual([201.6, 190]);
    });
  })
});
