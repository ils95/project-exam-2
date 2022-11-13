import Heading from "../Layout/Heading";
import GamesList from "./GamesList";
import CategoryPage from "../Category/CategoryPage";
import { Link } from "react-router-dom";

function Browse() {
  return (
    <div>
      <Heading title="Browse" />
      <Link to={"/cart"}>Your cart</Link>
      <CategoryPage />
      <GamesList />
    </div>
  );
}

export default Browse;
