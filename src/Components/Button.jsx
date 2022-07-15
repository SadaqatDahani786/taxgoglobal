import { forwardRef, useRef } from "react";
import styled from "styled-components";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
//Button
const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  text-transform: uppercase;
  width: ${({ block }) => (block ? "100%" : "auto")};
  font-size: ${({ size }) =>
    ((size === "small" || !size) && "1.1rem") ||
    (size === "medium" && "1.2rem") ||
    (size === "large" && "1.4rem")};
  letter-spacing: 0.01857em;
  cursor: pointer;
  color: var(
    --${({ variant, color, state }) => (state === "success" ? "color-success" : variant === "contained" ? (color === "primary" && "color-tertiary") || (color === "secondary" && "color-primary") || (color === "tertiary" && "color-primary") : (color === "primary" && "color-primary") || (color === "secondary" && "color-secondary") || (color === "tertiary" && "color-tertiary"))}
  );
  border: 1px solid
    var(
      --${({ variant, color }) => (variant === "outlined" ? (color === "primary" && "color-primary") || (color === "secondary" && "color-secondary") || (color === "tertiary" && "color-tertiary") : "color-transparent")}
    );
  background-color: var(
    --${({ variant, color, state }) => (state === "success" ? "color-tertiary" : variant === "contained" ? (color === "primary" && "color-primary") || (color === "secondary" && "color-secondary") || (color === "tertiary" && "color-tertiary") : "color-transparent")}
  );
  border: 1px solid
    var(${({ state }) => state === "success" && "--color-success"});
  padding: ${({ size }) =>
    ((size === "small" || !size) && "0.2rem 0.8rem") ||
    (size === "medium" && "0.4rem 1rem") ||
    (size === "large" && "0.8rem 1.4rem")};
  transition: all 0.2s ease;
  width: ${({ block }) => (block ? "100%" : "auto")};
  &:hover {
    background-color: var(
      --${({ variant, color }) => (variant === "text" || variant === "outlined" ? (color === "primary" && "color-primary-alpha") || (color === "secondary" && "color-secondary-alpha") || (color === "tertiary" && "color-tertiary-alpha") : (color === "secondary" && "color-secondary-dark") || (color === "tertiary" && "color-tertiary-dark"))}
    );
    border: 1px solid
      var(
        --${({ variant, color }) => (variant === "outlined" ? (color === "primary" && "color-primary-alpha") || (color === "secondary" && "color-secondary-alpha") || (color === "tertiary" && "color-tertiary-alpha") : "color-transparent")}
      );
  }
  &:disabled {
    background-color: var(--color-tertiary);
    border: 2px solid var(--color-primary-alpha);
    color: var(--color-primary-alpha);
    cursor: not-allowed;
  }
  &:focus {
    outline: auto;
  }
  & i {
    padding: 0 0.2rem;
  }
`;

/*
 ** **
 ** ** ** COMPONENT [Button]
 ** **
 */
const Button = forwardRef(
  (
    {
      color,
      variant,
      size,
      iconStart,
      iconEnd,
      block,
      onClick,
      disabled,
      dataset,
      state,
      success,
      children,
      type,
      loading = false,
    },
    ref
  ) => {
    const refButton = useRef(null);
    return (
      <ButtonStyled
        state={state}
        color={color}
        variant={variant}
        size={size}
        block={block}
        onClick={onClick}
        disabled={disabled}
        type={type}
        ref={ref ? ref : refButton}
        {...dataset}
      >
        {iconStart && iconStart}
        {state === "success" ? success : loading ? "loading..." : children}
        {iconEnd && iconEnd}
      </ButtonStyled>
    );
  }
);

export default Button;
