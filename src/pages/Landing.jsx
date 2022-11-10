import React from "react";
import videoBg from "../assets/videoBg.mp4";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import Heading from "../components/Layout/Heading";

export default function Landing() {
  return (
    <div className="Landing">
      <Heading title="Home" />
      <LoginForm />
      <RegistrationForm />
      <video src={videoBg} autoPlay loop muted />
    </div>
  );
}
