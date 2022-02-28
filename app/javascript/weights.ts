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

    if (this.currentValue() < firstValue) {
      return true;
    } else {
      return false;
    }
  }

  pctChange(): string {
    const firstValue: number = this.measurements[0].measurement;

    const change: number = Math.abs(this.currentValue() - firstValue);
    const pctage = (change / firstValue) * 100;

    return `${pctage.toFixed(2)}%`;
  }

  currentValue(): number {
    const lastIndex: number = this.measurements.length - 1;

    return this.measurements[lastIndex].measurement;
  }

  netChange(): string {
    const difference: number = this.currentValue() - this.measurements[0].measurement;

    return difference.toFixed(1);
  }

  dates(): Array<string> {
    return this.measurements.map(meas => meas.date);
  }

  weights(): Array<number> {
    return this.measurements.map(meas => meas.measurement);
  }
}
