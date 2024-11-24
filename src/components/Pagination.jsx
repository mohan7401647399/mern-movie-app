import React, { useContext } from "react";
import { userContext } from "./ContextAPI";

const Pagination = () => {
  const { setCurrentPage, totalPosts } = useContext(userContext);

  let pages = [];
  for (let i = 1; i < totalPosts; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center bg-black p-12 m-auto">
      {pages.map((page, index) => {
        return (
          <button
            className="p-1 m-1 border-2 border-yellow-50 rounded-md hover:p-2 hover:bg-white hover:text-black"
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
