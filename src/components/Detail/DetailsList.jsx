import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, DETAIL_PATH } from "../../constants/api";

function DetailsList() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + DETAIL_PATH + `${params.id}` + "?populate=*";
  const imageUrl = "http://localhost:1337";

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
      <div>{details.attributes.title}</div>
      <div>{details.attributes.description}</div>
      <img
        src={imageUrl + details.attributes.image.data.attributes.url}
        alt={details.title}
      />
    </>
  );
}

export default DetailsList;
