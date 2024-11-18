import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Search() {
  const [keyword, setKeyword] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Extract the keyword from URL parameters when the component mounts
    const searchParams = new URLSearchParams(location.search);
    const queryParameters = new URLSearchParams(window.location.search)
    const type = queryParameters.get("type")
    const urlKeyword = searchParams.get("keyword");
    setKeyword(urlKeyword);

    // Perform search if keyword is available in the URL
    if (keyword) {
      handleSearch();
    }
  }, [keyword]);

  const handleSearch = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}recipe`, {
        params: {
          keyword,
        },
      })
      .then((response) => setRecipeList(response?.data?.data.slice(1)))
      .catch((error) => console.error("Error searching recipes:", error));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 style={{
          marginLeft: 10,
        }}>Result of "{keyword}"</h1>

        {/* Display Search Results */}
        <div className="row">
          {recipeList.length > 0 ? (
            recipeList.map((recipe) => (
              <RecipeCard key={recipe.id} title={recipe.title} image={recipe.recipe_picture} />
            ))
          ) : (
            <p style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
              No recipes found.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}