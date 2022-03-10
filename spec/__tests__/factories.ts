import { DateTime } from "luxon";

import Weight from "../../app/javascript/resources/weight";
import Task from "../../app/javascript/resources/task";

import { Weight as _Weight } from "../../app/javascript/resource_types";
import { Task as _Task } from "../../app/javascript/resource_types";

class Factory {
  static create(resource: string, attrs = {}) {
    const { klass, generator } = resourceMap[resource];

    const data = {
      ...generator(),
      ...attrs,
    }

    return new klass(data);
  }

  static attributesFor(resource: string, attrs = {}) {
    const { generator } = resourceMap[resource]

    return {
      ...generator(),
      ...attrs,
    }
  }
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
    generator: (): _Task => {
      const id = Math.floor(Math.random() * 1000);
      const currentTime = DateTime.now().setZone("UTC");

      return {
        id: id,
        name: `Task #${Math.floor(Math.random() * 1000)}`,
        description: "Lorem ipsum dolor sit amet",
        start_time: currentTime.toISO(),
        end_time: currentTime.plus({ hours: 3 }).toISO(),
        completed_at: null,
        routes: {
          show: `/tasks/${id}`,
          update: `/tasks/${id}`,
          delete: `/tasks/${id}`,
          edit: `/tasks/${id}/edit`,
        },
      }
    },
  },
}

export default Factory;
