import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, TOKEN_PATH_REGISTER } from "../constants/api.js";
import { saveToken, saveUser } from "../utils/storage";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  password: yup.string().required("Please enter your password"),
  username: yup.string().required("Please enter your username"),
});

function RegistrationForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (registerCredentials) => {
    console.log(registerCredentials);

    Register(
      registerCredentials.email,
      registerCredentials.password,
      registerCredentials.username
    );
  };

  const [auth, setAuth] = useContext(AuthContext);

  async function Register(email, password, username) {
    const url = BASE_URL + TOKEN_PATH_REGISTER;

    const data = JSON.stringify({
      email: email,
      password: password,
      username: username,
    });

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

      console.log(json);

      setAuth(json);
      navigate("/browse");

      if (json.user) {
        saveToken(json.jwt);
        saveUser(json.user);
      }

      if (json.error) {
        console.log(json.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("email")} placeholder="Email" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input {...register("password")} placeholder="Password" />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <input {...register("username")} placeholder="Username" />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      <input type="submit" value="Sign up" />
    </form>
  );
}

export default RegistrationForm;
