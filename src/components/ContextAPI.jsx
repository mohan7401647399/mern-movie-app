/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const userContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [query, setQuery] = useState("Hulk");
  const [movies, setMovies] = useState([]);
  const [isError, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  //  Search movie function
  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Search movie cannot be empty.");
      return;
    }
    setError("");
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
      );

      if (response.data.Response === "False") {
        // Handle API response errors (e.g., no results found)
        toast.error(response.data.Error || "No results found.");
        setMovies([]);
      } else {
        setMovies(response.data.Search || []);
      }
    } catch (error) {
      // Network or unexpected errors
      console.error("Error fetching movies:", error);
      toast.error(
        error.response?.status
          ? `Error ${error.response.status}: ${error.response.statusText}`
          : "Failed to fetch movies. Please check your network connection."
      );
    }
  };

  //  retrieving the data's
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        await handleSearch();
      } catch (err) {
        if (err.name === "CanceledError") {
          console.log("Fetch canceled");
        }
      }
    };
    fetchMovies();
  }, []);

  //  get current posts
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = movies.slice(firstPostIndex, lastPostIndex);
  const totalPosts = movies.length;
  //   change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        paginate,
      }}
    >
      {children}
      {/* Display error messages */}
      {isError && (
        <p style={{ color: "red", textAlign: "center" }}>{isError}</p>
      )}
    </userContext.Provider>
  );
}
