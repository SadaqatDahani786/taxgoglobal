import React from "react";
import styled from "styled-components";

//UI Components
import CardBox from "../../Components/CardBox";
import Heading from "../../Components/Heading";

//Hooks & Functions
import { getCountriesList } from "../../Helpers/utils";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
const Wrapper = styled.div`
  min-height: 83vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap; ;
`;

/*
 ** **
 ** ** ** COMPONENT [Home]
 ** **
 */
const Home = () => {
  const countries = getCountriesList();

  return (
    <React.Fragment>
      <Heading level={3}>Where Do You Live?</Heading>
      <Wrapper>
        {countries.map((country) => (
          <CardBox path={country.path} text={country.country} />
        ))}
      </Wrapper>
    </React.Fragment>
  );
};

export default Home;
