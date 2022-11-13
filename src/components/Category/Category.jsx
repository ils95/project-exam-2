import { GiPistolGun, GiTreasureMap } from "react-icons/gi";
import { FaChess } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Category() {
  return (
    <div>
      <NavLink to={"/category/Shooter"}>
        <GiPistolGun />
        <h4>Shooter</h4>
      </NavLink>
      <NavLink to={"/category/Adventure"}>
        <GiTreasureMap />
        <h4>Adventure</h4>
      </NavLink>
      <NavLink to={"/category/Strategy"}>
        <FaChess />
        <h4>Strategy</h4>
      </NavLink>
    </div>
  );
}
