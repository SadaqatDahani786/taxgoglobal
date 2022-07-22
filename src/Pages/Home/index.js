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
//Container
const Container = styled.div`
  min-height: 83vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
`;

//Wrapper
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
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
    <Container>
      <Heading level={3}>Where Do You Live?</Heading>
      <Wrapper>
        {countries.map((country) => (
          <CardBox
            flag={country.flag}
            path={country.path}
            text={country.country}
          />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Home;
