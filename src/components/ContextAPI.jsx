import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const userContext = createContext(null);

export default function UserContextProvider({ children }) {
  //  HomePage component functions
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isError, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
      );
      setMovies(response.data.Search || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch movies");
    }
  };

  //    MovieDetailsPage component functions
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?i=${id}&apikey=f27268be`
        );
        setMovie(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch movie details");
      }
    };

    fetchMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //  favourite component functions
  const handleAddToFavorites = () => {
    if (!movie) return;

    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleRemoveFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.imdbID !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <userContext.Provider
      value={{
        handleSearch,
        query,
        setQuery,
        movies,
        isError,
        id,
        movie,
        setMovie,
        setError,
        handleAddToFavorites,
        handleRemoveFromFavorites,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
