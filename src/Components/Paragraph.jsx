import styled from "styled-components";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
//ParagraphStyled
const ParagraphStyled = styled.p`
  font-size: ${({ size }) => (size === "lead" ? "1.6rem" : "1.4rem")};
  color: var(
    ${({ color }) =>
      (color === "primary" && "--color-primary") ||
      (color === "secondary" && "--color-secondary") ||
      (color === "tertiary" && "--color-tertiary")}
  );
`;

/*
 ** **
 ** ** ** COMPONENT [Paragraph]
 ** **
 */
const Paragraph = ({ color, size, children }) => {
  return (
    <ParagraphStyled size={size} color={color}>
      {children}
    </ParagraphStyled>
  );
};

export default Paragraph;
