import { DateTime } from "luxon";

import Weight from "../../app/javascript/resources/weight";
import Task from "../../app/javascript/resources/task";

import { Weight as _Weight } from "../../app/javascript/resource_types";
import { Task as _Task } from "../../app/javascript/resource_types";

import util from "util";
import { exec } from "child_process";
const asyncExec = util.promisify(exec);

class Factory {
  static async create(resource: string, attrs = {}) {
    const { klass, generator } = resourceMap[resource];

    const data = {
      ...(await generator()),
      ...attrs,
    }

    return new klass(data);
  }

  static async attributesFor(resource: string, attrs = {}) {
    const { generator } = resourceMap[resource]

    return {
      ...(await generator()),
      ...attrs,
    }
  }
}

const factoryBotCmd = (resource: string): string => {
  return `./bin/rails runner "puts FactoryBot.attributes_for(:${resource}).to_json"`;
}

const resourceMap = {
  weight: {
    klass: Weight,
    generator: (): _Weight => {
      return {
        date: "2022/01/01",
        measurement: Math.random() * 200,
        user: {
          id: Math.floor(Math.random() * 1000),
          name: "David",
        },
      }
    },
  },
  task: {
    klass: Task,
    generator: async () => {
      const { stdout } = await asyncExec(factoryBotCmd("task"));

      return {
        id: Math.floor(Math.random() * 1000),
        ...JSON.parse(stdout),
      }

    },
  },
}

export default Factory;
