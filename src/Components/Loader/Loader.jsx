import { BallTriangle } from "react-loader-spinner";
import { Spinner } from "./Loader.styled";

export default function Loader() {
  return (
    <Spinner>
      <BallTriangle
        color="#00BFFF"
        height={100}
        width={100}
        ariaLabel="loading"
      />
    </Spinner>
  );
}
