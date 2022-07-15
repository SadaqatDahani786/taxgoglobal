import React from "react";
import styled from "styled-components";
import CardBox from "../../Components/CardBox";
import Heading from "../../Components/Heading";

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
    flex-wrap: wrap;    ;
`

/*
 ** **
 ** ** ** COMPONENT [Home]
 ** **
 */
const Home = ()=>{
    const countries = ['USA', 'UK', 'Ireland', 'Sweden', 'Germany', 'Iceland', 'Poland'];

    return (
      <React.Fragment>
        <Heading level={3}>Where Do You Live?</Heading>
        <Wrapper>
          {countries.map((curr) => (
            <CardBox path={curr.toLowerCase()} text={curr} />
          ))}
        </Wrapper>
      </React.Fragment>
    );
}

export default Home;