import PropTypes from "prop-types";
import { ButtonLoade, ButtonLoadeMore } from "./Button.styled";

export default function Button({ onClick }) {
  return (
    <ButtonLoade>
      <ButtonLoadeMore onClick={onClick}>Load more</ButtonLoadeMore>;
    </ButtonLoade>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
