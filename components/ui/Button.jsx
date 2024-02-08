import styled from "./button.module.css";

const size = {
  "12px": styled.button_12px,
  "55px": styled.button_55px,
};

const px = {
  "20px": styled.button_px20px,
};

const Button = ({ children, style, paddingx,  disapled = false}) => {
  return (
    <button
      type="submit"
      className={`${styled.button} ${style && size[style]} ${
        paddingx && px[paddingx]
      }`}
      disabled={disapled}      
    >
      {children}
    </button>
  );
};

export default Button;
