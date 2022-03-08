import Weight from "../resources/weight";

export default class Weights {
  _weights: Array<Weight>;

  constructor(measurements: Array<Weight>) {
    this._weights = measurements;
  }

  decreasing(): boolean {
    const firstValue: number = this._weights[0].measurement();

    if (this.currentValue() < firstValue) {
      return true;
    } else {
      return false;
    }
  }

  pctChange(): string {
    const firstValue: number = this._weights[0].measurement();

    const change: number = Math.abs(this.currentValue() - firstValue);
    const pctage = (change / firstValue) * 100;

    return `${pctage.toFixed(2)}%`;
  }

  currentValue(): number {
    const lastIndex: number = this._weights.length - 1;

    return this._weights[lastIndex].measurement();
  }

  netChange(): string {
    const difference: number = this.currentValue() - this._weights[0].measurement();

    return difference.toFixed(1);
  }

  dates(): Array<string> {
    return this._weights.map(meas => meas.date());
  }

  weights(): Array<number> {
    return this._weights.map(meas => meas.measurement());
  }
}
