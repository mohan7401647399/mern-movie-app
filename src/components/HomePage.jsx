import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "./ContextAPI";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/Logout";
import { Button } from "@mui/material";
import Pagination from "./Pagination";
import MovieLists from "./MovieLists";

const HomePage = () => {
  const {
    handleSearch,
    query,
    setQuery,
    isError,
    postsPerPage,
    setCurrentPage,
    currentPage,
    totalPosts,
  } = useContext(userContext);

  const { isLoading, error } = useAuth0();

  return (
    <div className="sm:h-screen">
      {error && <p>Authentication error...</p>}
      {!error && isLoading && <p>Loading....</p>}
      <div className="flex-1 sm:flex sm:place-content-between gap-5">
        <Link to={"/favorites"}>
          <Button variant="contained" color="success" size="small">
            Favourite Movies
          </Button>
        </Link>
        <span className="flex justify-center sm:p-1 p-5 gap-5">
          <input
            className="border border-gray-900 rounded-md mr-1 text-black w-fit sm:w-96 p-1"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies"
          />
          <Button variant="contained" onClick={handleSearch} size="small">
            Search
          </Button>
        </span>
        {!error && !isLoading && (
          <>
            <LogoutButton />
          </>
        )}
      </div>
      {isError && <p>{isError}</p>}
      <MovieLists />
      <Pagination
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default HomePage;
