import React from "react";

type User = {
  id: number,
  name: string,
}

type Weight = {
  date: string,
  measurement: number,
  user: User,
}

type DataProps = {
  weights: Array<Weight>,
  user: User,
}

const Index = ({ data }: { data: DataProps }) => {
  const { weights, user } = data;

  return (
    <section>
      <h1>{user.name}</h1>
    </section>
  );
}

export default Index;
