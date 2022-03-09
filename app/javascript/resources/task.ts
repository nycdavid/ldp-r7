import { Task as _Task } from "../resource_types";

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
    return this.data.start_time || "";
  }

  endTime(): string {
    return this.data.end_time || "";
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

  routes(): { edit: string } {
    return this.data.routes || { edit: "" };
  }
}
