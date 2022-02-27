type Weight = {
  date: string,
  measurement: number,
}

export default class Weights {
  measurements: Array<Weight>;

  constructor(measurements: Array<Weight>) {
    this.measurements = measurements;
  }

  decreasing(): boolean {
    const firstValue: number = this.measurements[0].measurement;
    const lastValue: number = this.measurements[this.measurements.length - 1].
      measurement;

    if (lastValue < firstValue) {
      return true;
    } else {
      return false;
    }
  }
}
