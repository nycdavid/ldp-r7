import Weights from "./weights_collection";
import Weight from "../resources/weight";
import axios from "axios";

export default class WeightsRequest {
  routes: {
    index: string,
  }

  constructor(routes: { index: string }) {
    this.routes = routes;
  }

  async index(user_name: string, day_range: number): Promise<Weights> {
    const url = new URL(this.routes.index);
    url.search = `?user_name=${user_name}&range=${day_range}`;

    const response = await axios.get(
      url.href,
      {
        headers: { "ACCEPT": "application/json" },
      },
    );
    const _weights = response.data.weights;
    const weights = _weights.map(_weight => (new Weight(_weight)))

    return new Weights(weights);
  }
}
