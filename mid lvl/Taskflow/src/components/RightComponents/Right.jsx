import React, { useContext, useEffect, useState } from "react";
import Clock from "./Clock";
import "./Right.css";
import Todo from "./Todo";

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const hoursStr = hours.toString().padStart(2, "0");

  return `${hoursStr}:${minutes}:${seconds} ${ampm}`;
}

console.log(getCurrentTime());

const Right = () => {
  const [Time, setTime] = useState(getCurrentTime);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => {};
  }, [getCurrentTime]);

  return (
    <div className="Right">
      <div className="clock">
        <Clock />
        <div className="digitalclock">
          Time: <div className="stime">{Time}</div>
        </div>
      </div>
      <div className="todo">
        <Todo />
      </div>
    </div>
  );
};

export default Right;
