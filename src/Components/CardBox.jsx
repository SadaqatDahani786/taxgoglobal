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
  justify-content: center;
  align-items: center;
`;

/*
 ** **
 ** ** ** COMPONENT [CardBox]
 ** **
 */
const CardBox = ({ text, img, path }) => {
  return (
    <CardBoxStyled>
      <Link to={`tax-calculator/${path}`}>
        <Heading level={3}>{text}</Heading>
      </Link>
    </CardBoxStyled>
  );
};

export default CardBox;
