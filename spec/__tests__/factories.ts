import Weight from "../../app/javascript/resources/weight";
import { Weight as _Weight } from "../../app/javascript/resource_types";

class Factory {
  static create(resource: string, attributes = {}) {
    if (resource === "weight") {
      const data: _Weight = {
        ...{
          date: "2022/01/01",
          measurement: Math.random() * 200,
          user: {
            id: Math.floor(Math.random() * 1000),
            name: "David",
          }
        },
        ...attributes,
      }

      return new Weight(data);
    }
  }
}

export default Factory;
