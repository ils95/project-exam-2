import Category from "./Category";
import Heading from "../Layout/Heading";
import CategoryList from "./CategoryList";

export default function CategoryPage() {
  return (
    <>
      <Heading title="Category" />
      <Category />
      <CategoryList />
    </>
  );
}
