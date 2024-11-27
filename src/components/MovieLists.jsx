import React, { useContext } from "react";
import Card from "./Card";
import { userContext } from "./ContextAPI";
import { Link } from "react-router-dom";

const MovieLists = () => {
  const { currentPosts: movies } = useContext(userContext);

  return (
    <div className="md:flex md:flex-wrap lg:flex grid grid-flow-row gap-5">
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
  );
};

export default MovieLists;
