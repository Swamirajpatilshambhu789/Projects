import React from "react";
import Right from "./RightComponents/Right";
import "./Content.css";
import LeftComponents from "./LeftComponents/LeftComponents";
import Calender from "./MiddleComponents/Calender";

const Content = () => {
  return (
    <div className="content">
      <Right />
      <LeftComponents />
      <Calender/>
    </div>
  );
};

export default Content;
