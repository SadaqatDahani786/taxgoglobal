import styled from "styled-components";
import { forwardRef, useEffect, useState } from "react";

//UI Componets
import Heading from "../Components/Heading";
import Paragraph from "./Paragraph";
import ChartPie from "./ChartPie";
import Button from "./Button";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
//Results Styled
const ResultsStyled = styled.div`
  width: 100%;
  height: fit-content;
  padding: 20px;
  background-color: var(--color-secondary);
  display: flex;
  flex-direction: column;
  gap: 25px;
  border: 1px solid var(--color-primary-alpha);
  box-shadow: var(--shadow-elevation-medium);
`;

//Wrapper
const Wrapper = styled.div`
  text-align: center;
  &:last-child {
    margin: 0 auto;
  }
`;

//List
const List = styled.ul`
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
`;

//List Item
const ListItem = styled.li`
  border-bottom: 1px solid var(--color-primary-alpha);
  & > p {
    display: flex;
    justify-content: space-between;
  }
`;

//Button Group
const ButtonGroup = styled.span`
  height: fit-content;
  display: flex;
  border: 1px solid var(--color-primary);
  border-radius: 0.1rem;
  overflow: hidden;
`;

//Span
const Span = styled.span`
  padding: 20px 0;
`;

/*
 ** **
 ** ** ** COMPONENT [Results]
 ** **
 */
const Results = forwardRef(({ taxInfo, currency }, ref) => {
  //State
  const [chartData, setChartData] = useState();
  const [isMonthly, setIsMonthly] = useState(false);

  //Set Chart Data
  useEffect(() => {
    const labels = taxInfo.map((info) => info.title);
    const data = taxInfo.map((info) =>
      isMonthly
        ? (info.value.substring(currency.length) / 12).toFixed(2)
        : info.value.substring(currency.length)
    );

    setChartData({ labels, data });
  }, [taxInfo, isMonthly, currency]);

  return (
    <ResultsStyled ref={ref}>
      <Wrapper>
        <Heading level={4}>Income Tax Results</Heading>

        <List>
          <ListItem>
            <Paragraph color="primary">
              <Span>Tax Results Per</Span>
              <Span>
                <ButtonGroup>
                  <Button
                    onClick={() => setIsMonthly(true)}
                    variant={isMonthly ? "contained" : "text"}
                    color="primary"
                  >
                    Monthly
                  </Button>
                  <Button
                    onClick={() => setIsMonthly(false)}
                    variant={isMonthly ? "text" : "contained"}
                    color="primary"
                  >
                    Annual
                  </Button>
                </ButtonGroup>
              </Span>
            </Paragraph>
          </ListItem>
          {taxInfo.map((info, ind) => (
            <ListItem key={ind}>
              <Paragraph color="primary">
                <Span>{info.title}</Span>
                <Span>
                  {isMonthly
                    ? info.value.substring(0, currency.length) +
                      (info.value.substring(currency.length) / 12).toFixed(2)
                    : info.value}
                </Span>
              </Paragraph>
            </ListItem>
          ))}
        </List>
      </Wrapper>

      <Wrapper>
        <Heading level={4}>Income Distribution Chart</Heading>
        <ChartPie labels={chartData?.labels} data={chartData?.data} />
      </Wrapper>
    </ResultsStyled>
  );
});

export default Results;
