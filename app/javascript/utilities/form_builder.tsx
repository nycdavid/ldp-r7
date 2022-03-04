import React from "react";

type HTMLSelect = {
  label: {
    value: string,
    for: string,
  },
  name: string,
  options: Array<{
    value: number,
    displayValue: string,
  }>,
};

type HTMLInput = {
  label: {
    value: string,
    for: string,
  },
  type: string,
  name: string,
}

type HTMLTextArea = {
  label: {
    value: string,
    for: string,
  },
  name: string,
  cols: number,
  rows: number,
}

const Form = ({ method, action, controls }) => {
  return (
    <form method={method} action={action}>
      {controls.map(control => {
      })}
    </form>
  );
};

export default Form;
