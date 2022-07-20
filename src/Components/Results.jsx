import styled from "styled-components";

//UI Componets
import Heading from "../Components/Heading";
import Paragraph from "./Paragraph";
import Table from "./Table";

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
`;

//Span
const Span = styled.span`
  font-weight: bold;
`;

/*
 ** **
 ** ** ** COMPONENT [Results]
 ** **
 */
const Results = ({ taxInfo, country }) => {
  //Table cols
  const cols = [
    { heading: `From (${taxInfo.currency})`, field: "from" },
    { heading: `To (${taxInfo.currency})`, field: "to" },
    { heading: `Rate (%)`, field: "rate" },
    { heading: `Tax (${taxInfo.currency})`, field: "tax" },
  ];

  //Table rows
  const rows = taxInfo.slabWiseTax.map((curr) => ({
    from: curr.taxSlab.from,
    to: curr.taxSlab.to,
    rate: curr.taxSlab.tax,
    tax: curr.tax,
  }));

  return (
    <ResultsStyled>
      <Heading level={3}>Results (Monthly)</Heading>
      <Paragraph color="primary">
        <Span>Gross Income:</Span>{" "}
        {taxInfo.currency + parseFloat(taxInfo.income / 12).toFixed(2)}
      </Paragraph>
      <Paragraph color="primary">
        <Span>Tax:</Span>{" "}
        {taxInfo.currency + parseFloat(taxInfo.totalTax / 12).toFixed(2)}
      </Paragraph>
      <Paragraph color="primary">
        <Span>
          {country.country === "UK"
            ? "National Insurance Contribution:"
            : "Universal Social Charge:"}
        </Span>
        {taxInfo.currency + parseFloat(taxInfo.ncc?.totalTax / 12).toFixed(2)}
      </Paragraph>
      {country.country === "UK" && (
        <Paragraph color="primary">
          <Span>Health And Social Care Levies:</Span>
          {taxInfo.currency + parseFloat(taxInfo.acc.tax / 12).toFixed(2)}
        </Paragraph>
      )}
      <hr />
      <Heading level={3}>Results (Annual)</Heading>
      <Paragraph color="primary">
        <Span>Gross Income:</Span>{" "}
        {taxInfo.currency + parseFloat(taxInfo.income).toFixed(2)}
      </Paragraph>
      <Paragraph color="primary">
        <Span>Tax:</Span>{" "}
        {taxInfo.currency + parseFloat(taxInfo.totalTax).toFixed(2)}
      </Paragraph>

      <Paragraph color="primary">
        <Span>
          {country.country === "UK"
            ? "National Insurance Contribution:"
            : "Universal Social Charge:"}
        </Span>
        {taxInfo.currency + parseFloat(taxInfo.ncc?.totalTax).toFixed(2)}
      </Paragraph>
      {country.country === "UK" && (
        <Paragraph color="primary">
          <Span>Health And Social Care Levies:</Span>
          {taxInfo.currency + parseFloat(taxInfo.acc.tax).toFixed(2)}
        </Paragraph>
      )}
      <hr />
      <Heading level={3}>Income Tax Breakdown</Heading>
      <Table color="primary" cols={cols} rows={rows} />
    </ResultsStyled>
  );
};

export default Results;
