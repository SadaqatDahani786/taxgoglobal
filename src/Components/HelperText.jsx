import styled from "styled-components";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
//HelperText
const HelperTextStyled = styled.div`
  text-align: center;
  position: absolute;
  border: 1px solid var(--color-primary-alpha);
  border-top: none;
  max-width: 100%;
  top: 0;
  left: 50%;
  transform: translateY(calc(-100% - 1rem)) translateX(-50%);
  font-size: 1.2rem;
  color: var(--color-error);
  background-color: var(--color-primary);
  padding: 1rem 0.5rem;
  display: none;
  z-index: 10;
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    transform: translateY(100%) translateX(-50%);
    left: 50%;
    width: 2rem;
    height: 1rem;
    background-color: var(--color-primary);
    clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  }
`;

/*
 ** **
 ** ** ** COMPONENT [HelperText]
 ** **
 */
const HelperText = ({ children }) => {
  return <HelperTextStyled>{children}</HelperTextStyled>;
};

export default HelperText;
