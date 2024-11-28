import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const handleRemoveFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.imdbID !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    toast.error("Movie removed in favorites lists");
  };

  return (
    <div className="sm:h-screen">
      <h2 className="font-bold">Your Favorite Movies</h2>
      <div className="place-content-center md:flex md:flex-wrap lg:flex grid grid-flow-row">
        {favorites.length === 0 ? (
          <p className="p-10 m-10 font-serif text-sky-500 text-2xl">
            No favorite movies added here.
            <br />
            <br />
            <Link to="/">Go to HomePage</Link>
          </p>
        ) : (
          favorites.map((movie) => (
            <Card>
              <span key={movie.imdbID} className="p-1 m-1">
                <Link to={`/movie/${movie.imdbID}`}>
                  <img
                    className="size-56"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                  <h3 className="font-mono">
                    {movie.Title} ({movie.Year})
                  </h3>
                </Link>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleRemoveFromFavorites(movie.imdbID)}
                >
                  Remove from Favorites
                </Button>
              </span>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
