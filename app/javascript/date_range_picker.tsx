import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  clickHandler: (
    dayValue: number,
    afterClick: () => void
  ) => void
}

const DateRangePicker = ({ clickHandler }: Props) => {
  const [dateRange, setDateRange]:
    [string, (dateRange: string) => void] = useState("7D");

  const ranges = {
    "7D": 7,
    "2W": 7 * 2,
    "3W": 7 * 3,
    "1M": 7 * 4,
    "6M": 7 * 4 * 6,
    "1Y": 365,
  }

  return (
    <DateButtons>
      <ul className="nav nav-pills">
        {
          Object.keys(ranges).map((rangeDisplayVal, idx) => {
            const dayValue = ranges[rangeDisplayVal];

            return (
              <li className="nav-item" key={idx}>
                <button
                  className={`nav-link ${dateRange == rangeDisplayVal ? "active" : ""}`}
                  onClick={() => {
                    clickHandler(dayValue, () => setDateRange(rangeDisplayVal));
                  }}
                >
                  {rangeDisplayVal}
                </button>
              </li>
            );
          })
        }
      </ul>
    </DateButtons>
  )
}

const DateButtons = styled.section`
  li {
    margin-right: 7px;
  }

  button {
    font-size: 12px;
    padding: 2px 8px;
  }
`;

export default DateRangePicker
