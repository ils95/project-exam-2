import videoBg from "../../assets/videoBg.mp4";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Heading from "../Layout/Heading";

export default function HomePage() {
  return (
    <div className="Landing">
      <Heading title="Bits & Bots" />
      <LoginForm />
      <RegistrationForm />
      <video src={videoBg} autoPlay loop muted />
    </div>
  );
}
