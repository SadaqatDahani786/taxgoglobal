import styled from "styled-components";
import React, { useEffect, useState } from "react";

const AlertStyled = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background-color: var(--color-tertiary);
  border-radius: 0.2rem;
  font-size: 1.6rem;
  border: 1px solid
    var(
      ${({ severety }) =>
        (severety === "success" && "--color-success") ||
        (severety === "error" && "--color-error") ||
        (severety === "info" && "--color-info") ||
        (severety === "warn" && "--color-warn")}
    );

  color: var(
    ${({ severety }) =>
      (severety === "success" && "--color-success") ||
      (severety === "error" && "--color-error") ||
      (severety === "info" && "--color-info") ||
      (severety === "warn" && "--color-warn")}
  );
`;

//Alert Icon
const AlertIcon = styled.i`
  color: var(
    ${({ severety }) =>
      (severety === "success" && "--color-success") ||
      (severety === "error" && "--color-error") ||
      (severety === "info" && "--color-info") ||
      (severety === "warn" && "--color-warn")}
  );
`;

//Heading Wrapper
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

//Title
const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

//Subtitle
const Subtitle = styled.div`
  font-size: 1.1rem;
`;

//Button Wrapper
const Action = styled.div`
  margin-left: auto;
  color: var(--color-error);
`;

//Float Button
const FloatButton = styled.div`
  width: 2rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  &:hover {
    background-color: var(--color-primary-alpha);
  }
  border-radius: 50%;
  cursor: pointer;
`;

const Alert = React.forwardRef(
  ({ open = false, title, message, severety = "info", onClose }, ref) => {
    const [stateAlert, setStateAlert] = useState(open);
    const classes = {
      error: "fas fa-exclamation-circle",
      success: "fas fa-check-circle",
      info: "fas fa-exclamation-circle",
      warn: "fas fa-exclamation-triangle",
    };

    useEffect(() => {
      setStateAlert(open);
    }, [open]);

    const closeHandler = () => {
      setStateAlert(false);
      onClose && onClose();
    };

    return (
      stateAlert && (
        <AlertStyled severety={severety}>
          <AlertIcon severety={severety} className={classes[severety]} />
          <Wrapper>
            {title && <Title>{title}</Title>}
            {message && <Subtitle>{message}</Subtitle>}
          </Wrapper>
          <Action>
            <FloatButton ref={ref} color="primary" onClick={closeHandler}>
              &times;
            </FloatButton>
          </Action>
        </AlertStyled>
      )
    );
  }
);

export default Alert;
