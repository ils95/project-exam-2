import videoBg from "../../assets/videoBg.mp4";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Heading from "../Layout/Heading";

export default function HomePage() {
  return (
    <div className="main">
      <div className="overlay"></div>
      <video src={videoBg} autoPlay loop muted />
      <div className="content">
        <Heading title="Bits & Bots" />
        <LoginForm />
        <RegistrationForm />
      </div>
    </div>
  );
}
