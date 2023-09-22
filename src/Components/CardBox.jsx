import styled from "styled-components";
import { Link } from "react-router-dom";

//UI Components
import Heading from "../Components/Heading";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
//Card Box Styled
const CardBoxStyled = styled.div`
  width: 20rem;
  height: 20rem;
  background-color: var(--color-secondary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  text-align: center;
  border-radius: 1rem;
  box-shadow: var(--shadow-elevation-low);
  &:hover {
    box-shadow: var(--shadow-elevation-medium);
  }
`;

//AnchorLink
const AnchorLink = styled(Link)`
  text-decoration: none;
  color: var(--color-primary);
`;

//Image Wrapper
const ImageWrapper = styled.div`
  width: 11rem;
  height: 12.5rem;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid var(--color-tertiary);
`;

//Image
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/*
 ** **
 ** ** ** COMPONENT [CardBox]
 ** **
 */
const CardBox = ({ text, flag, path }) => {
  return (
    <AnchorLink to={`tax-calculator/${path}`}>
      <CardBoxStyled>
        <Heading level={3}>{text}</Heading>
        <ImageWrapper>
          <Image src={flag} alt={text.toLowerCase() + "-flag"} />
        </ImageWrapper>
      </CardBoxStyled>
    </AnchorLink>
  );
};

export default CardBox;
