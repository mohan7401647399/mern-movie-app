import React from "react";

const Card = ({ children }) => {
  return (
    <div className="container mx-auto w-72 p-2">
      <div className="shadow-lg shadow-indigo-400 p-3">
        <div className="rounded-xl overflow-hidden ">{children}</div>
      </div>
    </div>
  );
};

export default Card;
