type Weight = {
  date: string,
  measurement: number,
  user: User,
}

type User = {
  id: number,
  name: string,
}

export {
  User,
  Weight,
}
