import { forwardRef, useRef } from "react";
import styled from "styled-components";

// UI Component
import HelperText from "./HelperText";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
//Wrapper
const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  cursor: text;
  position: relative;
  padding: ${({ size }) => (size === "small" && "1rem") || "1.5rem 1rem"};
  padding-bottom: 0;
  background-color: var(
    ${({ color }) =>
      (color === "primary" && "--color-primary-alpha") ||
      (color === "secondary" && "--color-primary") ||
      (color === "tertiary" && "--color-secondary")}
  );
  border-bottom: ${({ size }) => (size === "small" && "3px") || "5px"} solid
    var(
      ${({ error, color }) =>
        error
          ? "--color-error"
          : (color === "primary" && "--color-primary") ||
            (color === "secondary" && "--color-secondary") ||
            (color === "tertiary" && "--color-tertiary")}
    );
`;

//Input Styled
const InputStyled = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  height: 2rem;
  font-size: ${({ size }) => (size === "small" && "1.3rem") || "1.6rem"};
  font-weight: 100;
  color: var(
    ${({ error, color }) =>
      error
        ? "--color-error"
        : (color === "primary" && "--color-primary") ||
          (color === "secondary" && "--color-secondary") ||
          (color === "tertiary" && "--color-tertiary")}
  );
  &:not(:placeholder-shown) ~ label,
  &:focus ~ label {
    font-size: 1rem;
    top: 20%;
  }
  &:focus ~ div {
    display: block;
  }
  &:disabled {
    cursor: text;
  }
`;

//Label
const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 0.5rem;
  font-size: 1.6rem;
  font-weight: 100;
  color: var(
    ${({ error, color }) =>
      error
        ? "--color-error"
        : (color === "primary" && "--color-primary") ||
          (color === "secondary" && "--color-secondary") ||
          (color === "tertiary" && "--color-tertiary")}
  );
  transform: translateY(-50%);
  transition: all 0.3s ease;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: text;
`;

/*
 ** **
 ** ** ** COMPONENT [Input]
 ** **
 */
const Input = forwardRef(
  (
    {
      size = "medium",
      color = "primary",
      type = "text",
      name = "name",
      label = "",
      icon,
      value = "",
      error = false,
      helpertext = "",
      disabled = false,
      onChange,
      onBlur,
      min,
      max,
    },
    ref
  ) => {
    const refInput = useRef(null);

    //Click Handler
    const clickHandler = (e) => {
      if (ref) return ref.current.focus();
      refInput.current.focus();
    };

    return (
      <Wrapper size={size} error={error} color={color} onClick={clickHandler}>
        <InputStyled
          ref={ref ? ref : refInput}
          id={name}
          color={color}
          type={type}
          name={name}
          placeholder=" "
          value={value}
          onChange={onChange}
          size={size}
          min={min}
          max={max}
          error={error}
          onBlur={onBlur}
          disabled={disabled}
        />
        {error && <HelperText>{helpertext}</HelperText>}
        <Label error={error} color={color} htmlFor={name}>
          {icon && icon}
          <span>{label}</span>
        </Label>
      </Wrapper>
    );
  }
);
export default Input;
