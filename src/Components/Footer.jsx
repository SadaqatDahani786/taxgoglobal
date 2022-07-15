import styled from "styled-components";

//UI Components
import Paragraph from "./Paragraph";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
//FooterStyled
const FooterStyled = styled.footer`
  min-height: 5vh;
  background-color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
`;

//Copyright Text Wrapper
const CopyrightTextWrapper = styled.div`
  text-align: center;
`;

/*
 ** **
 ** ** ** COMPONENT [Footer]
 ** **
 */
const Footer = () => {
  return (
    <FooterStyled>
      <CopyrightTextWrapper>
        <Paragraph size="lead" color="tertiary">
          &copy;IncomeTaxCalculator - All rights reserved.
        </Paragraph>
      </CopyrightTextWrapper>
    </FooterStyled>
  );
};

export default Footer;
