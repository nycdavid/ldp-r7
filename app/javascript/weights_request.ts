import Weights from "./weights";
import axios from "axios";

export default class WeightsRequest {
  routes: {
    index: string,
  }

  constructor(routes: { index: string }) {
    this.routes = routes;
  }

  async index(): Promise<Weights> {
    const response = await axios.get(this.routes.index);

    return new Weights(response.data);
  }
}
