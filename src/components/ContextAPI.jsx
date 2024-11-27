/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext(null);

export default function UserContextProvider({ children }) {
  //  HomePage component functions
  const [query, setQuery] = useState("Hulk");
  const [movies, setMovies] = useState([]);
  const [isError, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
      );
      setMovies(response.data.Search);
      setError("");
    } catch (error) {
      console.log(error);
      setError("Failed to fetch movies");
    }
  };

  // Automatically perform the search when the component mounts or when `query` changes
  useEffect(() => {
    handleSearch();
  }, [query]);

  //  pagination component function
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = movies.slice(firstPostIndex, lastPostIndex);
  const totalPosts = currentPosts.length;

  return (
    <userContext.Provider
      value={{
        handleSearch,
        query,
        setQuery,
        movies,
        isError,
        setError,
        postsPerPage,
        currentPosts,
        setCurrentPage,
        currentPage,
        totalPosts,
        setPostsPerPage,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
