import styled from 'styled-components';
import {Link as RouterLink} from 'react-router-dom'

//Images
import LogoImage from '../Assets/Images/logo-taxgoglobal.png'

/*
** **
** ** ** STYLED COMPONENTS
** **
*/
//HeaderStyled
const HeaderStyled = styled.header`
    width: 100%;
    height: 10vh;
    background-color: var(--color-white);
`;

//Header Content
const HeaderContent = styled.div`
    max-width: 1200px; 
    margin: 0 auto;
    display: flex;
    align-items: center;    
    height: 100%;    
`;

//Logo Wrapper
const LogoWrapper =styled.div``;

//Logo
const Logo = styled.img`
    width: 13rem;
    height: auto;
`;

//NavMenu
const NavMenu = styled.nav`
    flex: 1 1 auto;    
    display: flex;
    justify-content: center;
    gap: 5rem; 
    font-weight: bold; 
`

//AnchorLink
const AnchorLink = styled(RouterLink)`
    font-size: 2.2rem;       
    text-decoration: none;
    color: var(--color-black);    
    &:hover{
        color: var(--color-primary);
    }
`

/*
** **
** ** ** COMPONENT [Header]
** **
*/
const Header = ()=>{
    return <HeaderStyled>
        <HeaderContent>
            <LogoWrapper>
                <RouterLink to='/'>
                    <Logo src={LogoImage}/>                
                </RouterLink>                
            </LogoWrapper>        
            <NavMenu>
                <AnchorLink to='/'>Home</AnchorLink>
                <AnchorLink to='/tax-calcultor'>Tax Calculator</AnchorLink>
            </NavMenu>
        </HeaderContent>        
    </HeaderStyled>
}

export default Header;