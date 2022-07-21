import styled from "styled-components";

//UI Componets
import Heading from "../Components/Heading";
import Paragraph from "./Paragraph";
import Table from "./Table";
import ChartPie from "./ChartPie";
import { useEffect, useState } from "react";

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

//Span
const Span = styled.span`
  padding: 20px 0;
`;

/*
 ** **
 ** ** ** COMPONENT [Results]
 ** **
 */
const Results = ({ taxInfo }) => {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const labels = taxInfo.map((info) => info.title);
    const data = taxInfo.map((info) => info.value.substring(1));

    setChartData({ labels, data });
  }, [taxInfo]);
  //Table cols
  // const cols = [
  //   { heading: `From (${taxInfo.currency})`, field: "from" },
  //   { heading: `To (${taxInfo.currency})`, field: "to" },
  //   { heading: `Rate (%)`, field: "rate" },
  //   { heading: `Tax (${taxInfo.currency})`, field: "tax" },
  // ];

  // //Table rows
  // const rows = taxInfo.slabWiseTax.map((curr) => ({
  //   from: curr.taxSlab.from,
  //   to: curr.taxSlab.to,
  //   rate: curr.taxSlab.tax,
  //   tax: curr.tax,
  // }));

  return (
    <ResultsStyled>
      <Wrapper>
        <Heading level={4}>Income Tax Results</Heading>

        <List>
          {taxInfo.map((info, ind) => (
            <ListItem key={ind}>
              <Paragraph color="primary">
                <Span>{info.title}</Span>
                <Span>{info.value}</Span>
              </Paragraph>
            </ListItem>
          ))}
        </List>
      </Wrapper>

      <Wrapper>
        <Heading level={4}>Income Distribution Chart</Heading>
        <ChartPie labels={chartData?.labels} data={chartData?.data} />
      </Wrapper>

      {/* <Heading level={3}>Income Tax Breakdown</Heading>
      <Table color="primary" cols={cols} rows={rows} /> */}
    </ResultsStyled>
  );
};

export default Results;
