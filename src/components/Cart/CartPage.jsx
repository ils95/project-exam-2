import { getCart, updateCart } from "../../utils/storage";
import { useState } from "react";
import { BsCart, BsCartCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function CartPage() {
  const cart = getCart();
  const [isActive, setIsActive] = useState(false);

  console.log(cart);
  if (cart.length === 0) {
    return (
      <>
        <div>Your cart is empty</div>
        <button disabled>Check out</button>
      </>
    );
  } else {
    return (
      <>
        {cart.map(function (game) {
          if (cart.length === 0) {
          }
          return (
            <>
              <div
                onClick={() => {
                  setIsActive(!isActive);
                  updateCart(game);
                  console.log("current cart ");
                }}
              >
                {isActive ? <BsCartCheck /> : <BsCart />}
              </div>
              <h2>{game.attributes.name}</h2>
              <Link to={"/checkout"}>
                <button>Check out</button>
              </Link>
            </>
          );
        })}
      </>
    );
  }
}
