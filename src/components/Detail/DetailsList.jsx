import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, DETAIL_PATH } from "../../constants/api";
import { BsCart, BsCartCheck } from "react-icons/bs";
import { updateCart } from "../../utils/storage";

function DetailsList() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const url = BASE_URL + DETAIL_PATH + `${params.id}` + "?populate=*";

  useEffect(
    function () {
      async function fetchDetails() {
        try {
          const response = await fetch(url);

          if (response.ok) {
            const json = await response.json();
            console.log(json);
            setDetails(json.data);
          } else {
            setError("An error occured");
          }
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchDetails();
    },
    [params.id]
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>ERROR: unable to fetch games</div>;
  }

  return (
    <>
      <div
        onClick={() => {
          setIsActive(!isActive);
          updateCart(details);
          console.log("current cart ");
        }}
      >
        {isActive ? <BsCartCheck /> : <BsCart />}
      </div>
      <div>{details.attributes.name}</div>
      <div>{details.attributes.description}</div>
      <img
        src={details.attributes.image.data.attributes.url}
        alt={details.name}
      />
    </>
  );
}

export default DetailsList;
