import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "./ContextAPI";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/Logout";
import { Button } from "@mui/material";
import Card from "./Card";
import Pagination from "./Pagination";

const HomePage = () => {
  const {
    handleSearch,
    query,
    setQuery,
    currentPosts: movies,
    isError,
    postsPerPage,
    setCurrentPage,
    currentPage,
    totalPosts,
  } = useContext(userContext);

  const { isLoading, error } = useAuth0();

  return (
    <div>
      {error && <p>Authentication error...</p>}
      {!error && isLoading && <p>Loading....</p>}
      <div className="flex-1 sm:flex sm:place-content-between">
        <Link to={"/favorites"}>
          <Button variant="contained" color="success" size="small">
            Favourite Movies
          </Button>
        </Link>
        <span className="flex justify-center sm:p-1 p-5">
          <input
            className="border border-gray-900 rounded-md mr-1 text-black w-fit sm:w-96"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies"
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

      <div className="md:flex md:flex-wrap lg:flex grid grid-flow-row bg-black">
        {movies.map((movie) => (
          <Card>
            <div key={movie.imdbID}>
              <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} className="size-56" />
                <h3>
                  {movie.Title} ({movie.Year})
                </h3>
              </Link>
            </div>
          </Card>
        ))}
      </div>
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
