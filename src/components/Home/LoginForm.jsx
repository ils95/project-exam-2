import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import { getToken, getUser } from "../../utils/storage";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (loginCredentials) => {
    console.log(loginCredentials);

    Login(loginCredentials.email, loginCredentials.password);
  };

  const [auth, setAuth] = useContext(AuthContext);

  async function Login(email, password) {
    const url = BASE_URL + TOKEN_PATH;

    setSubmitting(true);

    const data = JSON.stringify({ identifier: email, password: password });

    const options = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, options);
      const json = await response.json();

      console.log("json", json);
      console.log("response", options);

      if (json.user) {
        getToken(json.jwt);
        getUser(json.user);

        setAuth(json.user);
        navigate("/browse");
      } else {
        console.log(error);
        setError("Incorrect email or password");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={submitting}>
          <div>
            <input {...register("email")} placeholder="Email" />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div>
            <input {...register("password")} placeholder="Password" />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <button>{submitting ? "Loggin in..." : "Login"}</button>
          {error ? <label>{error}</label> : null}
        </fieldset>
      </form>
    </div>
  );
}
