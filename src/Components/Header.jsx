import styled from "styled-components";

//UI Components
import Heading from "../Components/Heading";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
//HeaderStyled
const HeaderStyled = styled.header`
  width: 100%;
  min-height: 12vh;
  background-color: var(--color-primary);
  text-align: center;
`;

/*
 ** **
 ** ** ** COMPONENT [Header]
 ** **
 */
const Header = () => {
  return (
    <HeaderStyled>
      <Heading level={1} color="secondary">
        Income Tax Calculator
      </Heading>
      <Heading level={2} color="tertiary">
        We calculate your taxes, so you don't have to :)
      </Heading>
    </HeaderStyled>
  );
};

export default Header;
