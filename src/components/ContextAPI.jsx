import axios from "axios";
import { createContext, useState } from "react";

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

  return (
    <userContext.Provider
      value={{
        handleSearch,
        query,
        setQuery,
        movies,
        isError,
        setError,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
