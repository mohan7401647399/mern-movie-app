import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Add to Favourites");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
        );
        setMovie(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch movie details");
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddToFavorites = () => {
    if (!movie) return;
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    setButtonText("Added");
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      {error && <p>{error}</p>}
      {movie && (
        <div className="p-1 m-1">
          <img src={movie.Poster} alt={movie.Title} />
          <h2>
            <strong>Movie Name</strong> : {movie.Title}
          </h2>
          <h2>
            <strong>Year Of Release</strong> : {movie.Released}
          </h2>
          <p>
            <strong>Story</strong>: {movie.Plot}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <Button
            size="small"
            onClick={handleAddToFavorites}
            variant="contained"
          >
            {buttonText}
          </Button>
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
