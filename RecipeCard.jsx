import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard(props) {
  const { title, image } = props;

  return (
    <>
      <div className="col-md-4 col-xs-12 mb-4">
          <Link className="text-decoration-none text-white" to={`/detail/${title?.toLowerCase()?.split(" ").join("-")}`}>
            <div className="popular-recipe-image " style={{ backgroundImage: `url('${image}')` }}>
              <h3 style={{ textShadow: "0px 0px 2px rgba(0, 0, 0, 0.8)" }}>{title}</h3>
            </div>
          </Link>
        </div>
    </>
  );
}