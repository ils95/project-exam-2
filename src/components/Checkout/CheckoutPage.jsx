import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCart, removeCart } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    address: yup.string().required("Please enter your address"),
    cardnumber: yup.number().required("Please enter a valid card number"),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
    cvc: yup.string().required("Please enter your cvc"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit() {
    const confirmPurchase = window.confirm("Confirm payment");

    if (confirmPurchase) {
      navigate("/browse");
      removeCart();
    }
  }

  const currentcart = getCart();

  return (
    <>
      <div>CheckoutPage</div>
      <div>items in cart: {currentcart.length}</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div>
            <input {...register("name")} placeholder="Name" />
            {errors.name && <span>{errors.name.message}</span>}
          </div>

          <div>
            <input {...register("address")} placeholder="Address" />
            {errors.address && <span>{errors.address.message}</span>}
          </div>

          <div>
            <input {...register("cardnumber")} placeholder="Card number" />
            {errors.cardnumber && <span>{errors.cardnumber.message}</span>}
          </div>

          <div>
            <input
              {...register("createdOn")}
              placeholder="Card expiration date"
            />
            {errors.createdOn && <span>{errors.createdOn.message}</span>}
          </div>

          <div>
            <input {...register("cvc")} placeholder="CVC" />
            {errors.cvc && <span>{errors.cvc.message}</span>}
          </div>

          <input type="submit" value="purchase" />
        </fieldset>
      </form>
    </>
  );
}
