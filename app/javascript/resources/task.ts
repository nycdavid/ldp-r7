import { DateTime } from "luxon";

import { Task as _Task } from "../resource_types";

type Routes = {
  edit: string,
  update: string,
  show: string,
}

const DTFormat = "MMM d h:mma";

export default class Task {
  data: _Task

  constructor(data: _Task) {
    this.data = data;
  }

  id(): number {
    return this.data.id || -1;
  }

  name(): string {
    return this.data.name || "";
  }

  description(): string {
    return this.data.description || "";
  }

  startTime(): string {
    return DateTime.fromISO(this.data.start_time).toFormat(DTFormat);
  }

  endTime(): string {
    return DateTime.fromISO(this.data.end_time).toFormat(DTFormat);
  }

  completedAt(): string {
    return this.data.completed_at || "";
  }

  completed(): boolean {
    if (this.completedAt() === "") {
      return false;
    } else {
      return true;
    }
  }

  overdue(): boolean {
    const clientTime = DateTime.now();
    const endDate = DateTime.fromISO(this.data.end_time).
    setZone(clientTime.zoneName);

    return endDate < clientTime;
  }

  routes(): Routes {
    return this.data.routes || { edit: "", update: "", show: "" };
  }
}

export {
  DTFormat,
}
