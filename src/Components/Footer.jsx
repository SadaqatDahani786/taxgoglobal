import styled from 'styled-components';

/*
** **
** ** ** STYLED COMPONENTS
** **
*/
//FooterStyled
const FooterStyled = styled.footer`
    min-height: 40vh;
    background-color: var(--color-tertiary);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;    
`

//Text
const CopyrightText = styled.p`
    width: 100%;
    text-align: center;
    background-color: var(--color-white);
    font-size: 1.7rem;
    padding: 20px 0;
`

/*
** **
** ** ** COMPONENT [Footer]
** **
*/
const Footer = ()=>{
    return <FooterStyled>
        <CopyrightText>
            Taxgoglobal &copy; - All rights reserved.
        </CopyrightText>
    </FooterStyled>
}

export default Footer;