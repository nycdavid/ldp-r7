import React from "react";
import styled from "styled-components";

export default class New extends React.Component {
  render() {
    return (
      <div className="container">
        <form method="post" action="/weights">
          <div className="row">
            <div className="col">
              <label htmlFor="weight_user" className="form-label">User</label>
              <select name="weight[user_id]" className="form-select">
                <option value={1}>David</option>
                <option value={2}>Jane</option>
                <option value={3}>Hajin</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="weight_measurement" className="form-label">Measurement</label>
              <input type="text" name="weight[measurement]" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="" className="form-label">Notes</label>
              <TextArea name="" id="" className="form-control" cols={30} rows={10} />
            </div>
          </div>
          <div>
            <button className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const TextArea = styled.textarea`
  resize: none;
`;
