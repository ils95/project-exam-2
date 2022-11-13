import { BASE_URL, GAMES_PATH } from "../../constants/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsCart, BsCartCheck } from "react-icons/bs";
import { updateCart } from "../../utils/storage";

function GamesList() {
  const gamesUrl = BASE_URL + GAMES_PATH + "?populate=*";

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(function () {
    async function fetchGames() {
      try {
        const response = await fetch(gamesUrl);

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setGames(json.data);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>ERROR: unable to fetch games</div>;
  }

  return (
    <>
      {games.map(function (game) {
        return (
          <div key={game.id}>
            <div
              onClick={() => {
                setIsActive(!isActive);
                updateCart(game);
                console.log("current cart ");
              }}
            >
              {isActive ? <BsCartCheck /> : <BsCart />}
            </div>

            <Link to={"/detail/" + game.id}>
              <h2>{game.attributes.name}</h2>
            </Link>
            <img
              src={game.attributes.image.data.attributes.url}
              alt={game.name}
            />
          </div>
        );
      })}
    </>
  );
}

export default GamesList;
