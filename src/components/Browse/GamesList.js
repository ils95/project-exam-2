import { BASE_URL, GAMES_PATH } from "../../constants/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsCart, BsCartCheck } from "react-icons/bs";
import { saveCart, getCart } from "../../utils/storage";

function GamesList() {
  const gamesUrl = BASE_URL + GAMES_PATH + "?populate=*";
  const url = "http://localhost:1337";

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false);
  //const [cartArray, setCartArray] = useState([]);

  //saveCart([]);

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

  function updateCart(game) {
    setIsActive(!isActive);

    const currentCart = getCart();

    const productExists = currentCart.find(function (item) {
      return item.id === game.id;
    });

    if (productExists === undefined) {
      currentCart.push(game);
      saveCart(currentCart);
    } else {
      const newCart = currentCart.filter((item) => item.id !== game.id);
      saveCart(newCart);
    }
  }

  return (
    <>
      {games.map(function (game) {
        return (
          <div key={game.id}>
            <div
              onClick={() => {
                updateCart(game);
                console.log("current cart ");
              }}
            >
              {isActive ? <BsCartCheck /> : <BsCart />}
            </div>

            <Link to={"/detail/" + game.id}>
              <h2>{game.attributes.title}</h2>
            </Link>
            <img
              src={url + game.attributes.image.data.attributes.url}
              alt={game.title}
            />
          </div>
        );
      })}
    </>
  );
}

export default GamesList;
