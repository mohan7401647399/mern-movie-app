import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "./ContextAPI";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/Logout";
import { Button } from "@mui/material";

const HomePage = () => {
  const { handleSearch, query, setQuery, movies, isError } =
    useContext(userContext);

  const { isLoading, error } = useAuth0();

  return (
    <>
      {error && <p>Authentication error...</p>}
      {!error && isLoading && <p>Loading....</p>}
      <div className="sm:flex sm:place-content-between">
        <Link to={"/favorites"}>
          <Button variant="contained" color="success" size="small">
            Favourite Movies
          </Button>
        </Link>
        <span className="flex">
          <input
            className="border border-gray-900 rounded-md mr-1 text-black w-96 "
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

      <div className="flex p-auto m-auto h-screen">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="p-1 m-1">
            <Link to={`/movie/${movie.imdbID}`}>
              <img src={movie.Poster} alt={movie.Title} />
              <h3>
                {movie.Title} ({movie.Year})
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
