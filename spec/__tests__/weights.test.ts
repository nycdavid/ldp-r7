import Factory from "./factories";

import Weights from "../../app/javascript/weights/weights_collection";
import Weight from "../../app/javascript/resources/weight";

describe("WeightsCollection", () => {
  let measurements: Array<Weight> = [];

  beforeEach(() => {
    Factory.create("weight");
    measurements = [Factory.create("weight")];
  });

  describe("#constructor", () => {
    test("setting the measurements attribute", () => {
      const weights = new Weights(measurements);

      expect(weights._weights[0]).toMatchObject(measurements[0]);
    });
  });

  describe("#decreasing", () => {
    test("returns true if the last weight is less than the first", () => {
      const newVal = measurements[0].measurement() - 1;
      measurements.push(Factory.create("weight", { measurement: newVal }));

      const weights = new Weights(measurements);

      expect(weights.decreasing()).toEqual(true);
    });

    test("returns false if the last weight is greater than the first", () => {
      const newVal = measurements[0].measurement() + 1;
      measurements.push(Factory.create("weight", { measurement: newVal }));

      const weights = new Weights(measurements);

      expect(weights.decreasing()).toEqual(false);
    });
  });

  describe("#pctChange", () => {
    test("returns the percentage change between first and last weight", () => {
      const newVal = measurements[0].measurement() * 1.0169;
      measurements.push(Factory.create("weight", { measurement: newVal }));

      const weights = new Weights(measurements);

      expect(weights.pctChange()).toEqual("1.69%");
    });
  });

  describe("#currentValue", () => {
    test("returns the latest measurement", () => {
      measurements.push(Factory.create("weight", { measurement: 205 }))

      const weights = new Weights(measurements);

      expect(weights.currentValue()).toEqual(205);
    });
  });

  describe("#netChange", () => {
    test("returns the difference between the first and current values", () => {
      const meas: number = measurements[0].measurement() + 3.4;

      measurements.push(Factory.create("weight", { measurement: meas }))

      const weights = new Weights(measurements);

      expect(weights.netChange()).toEqual("3.4");
    });

    test("returns a negative number when the change is a decrease", () => {
      measurements.push(Factory.create("weight"))

      const weights = new Weights(measurements);
      const lastIndex: number = weights.weights().length - 1;
      const netChange = weights.weights()[lastIndex] - weights.weights()[0];

      expect(weights.netChange()).toEqual(netChange.toFixed(1));
    })
  });

  describe("#dates", () => {
    test("returns an array of date strings", () => {
      measurements.push(Factory.create("weight"))

      const weights = new Weights(measurements);

      expect(weights.dates()).toEqual(measurements.map(meas => meas.date()));
    });
  });

  describe("#weights", () => {
    test("returns an array of weight measurements", () => {
      measurements.push(Factory.create("weight"))

      const weightsColl = new Weights(measurements);

      expect(weightsColl.weights()).
        toEqual(measurements.map(meas => meas.measurement()));
    });
  })
});
