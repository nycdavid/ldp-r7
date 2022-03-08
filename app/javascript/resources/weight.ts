import { Weight as _Weight } from "../resource_types";

class Weight {
  _weight;

  constructor(_weight: _Weight) {
    this._weight = _weight;
  }

  date(): string {
    return this._weight.date || "";
  }

  measurement(): number {
    return this._weight.measurement || -1;
  }
}

export default Weight;
