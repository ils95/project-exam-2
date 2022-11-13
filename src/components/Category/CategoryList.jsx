import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, GAMES_PATH } from "../../constants/api";

function CategoryList() {
  let params = useParams();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const imageUrl = "http://localhost:1337";

  useEffect(
    function () {
      async function fetchCategories() {
        const url = BASE_URL + GAMES_PATH + "?populate=*";

        try {
          const response = await fetch(url);

          if (response.ok) {
            const json = await response.json();
            console.log(json);
            setCategories(json.data);
            console.log(params.type);
          } else {
            setError("An error occured");
          }
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchCategories();
    },
    [params.type]
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>ERROR: unable to fetch games</div>;
  }

  for (let i = 0; i < categories.length; i++) {
    if (
      categories[i].attributes.categories.data[0].attributes.Name == params.type
    ) {
      console.log(categories[i]);
      return (
        <>
          <div>{categories[i].attributes.title}</div>
          <img
            src={imageUrl + categories[i].attributes.image.data.attributes.url}
            alt={categories[i].attributes.title}
          />
        </>
      );
    }
  }
}

export default CategoryList;
