type Weight = {
  date: string,
  measurement: number,
  user: User,
}

type User = {
  id: number,
  name: string,
}

type Task = {
  id: number,
  name: string,
  description: string,
  start_time: string,
  end_time: string,
  completed_at: string | null,
  routes: {
    show: string,
    update: string,
    delete: string,
    edit: string,
  },
}

export {
  Task,
  User,
  Weight,
}
